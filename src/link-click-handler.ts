import * as vscode from 'vscode';
import { MarkdownParser } from './parser';
import { mapNormalizedToOriginal } from './position-mapping';
import { resolveImageTarget } from './hover-utils';

/**
 * Handles single-click navigation for markdown links and images.
 * 
 * When enabled, allows single-click to open links/images without requiring Ctrl+Click.
 * This provides a more intuitive web-browser-like experience, but can interfere with
 * text selection, so it's configurable and disabled by default.
 */
export class LinkClickHandler {
  private parser = new MarkdownParser();
  private disposables: vscode.Disposable[] = [];
  private isEnabled: boolean = false;

  /**
   * Enables or disables single-click link navigation.
   * 
   * @param enabled - Whether single-click navigation is enabled
   */
  setEnabled(enabled: boolean): void {
    if (this.isEnabled === enabled) {
      return;
    }

    this.isEnabled = enabled;
    this.dispose();

    if (enabled) {
      this.setupClickHandler();
    }
  }

  /**
   * Sets up the mouse click handler for single-click navigation.
   */
  private setupClickHandler(): void {
    // Listen for text editor mouse clicks
    const clickDisposable = vscode.window.onDidChangeTextEditorSelection((event) => {
      // Only handle if it's a single click (no selection, no modifier keys)
      // We detect this by checking if the selection is empty and the kind is 'mouse'
      if (event.kind === vscode.TextEditorSelectionChangeKind.Mouse && 
          event.selections.length === 1 && 
          event.selections[0].isEmpty) {
        this.handleClick(event.textEditor, event.selections[0].active);
      }
    });

    this.disposables.push(clickDisposable);
  }

  /**
   * Handles a click on the editor to check if it's on a link/image and open it.
   * 
   * @param editor - The text editor
   * @param position - The clicked position
   */
  private async handleClick(editor: vscode.TextEditor, position: vscode.Position): Promise<void> {
    if (!this.isEnabled || editor.document.languageId !== 'markdown') {
      return;
    }

    const document = editor.document;
    const text = document.getText();
    const decorations = this.parser.extractDecorations(text);
    const clickOffset = document.offsetAt(position);

    // Find if the click is on a link or image
    for (const decoration of decorations) {
      if ((decoration.type === 'link' || decoration.type === 'image') && decoration.url) {
        // Map normalized positions to original document offsets
        const start = mapNormalizedToOriginal(decoration.startPos, text);
        const end = mapNormalizedToOriginal(decoration.endPos, text);

        // Check if click is within the link/image range
        if (clickOffset >= start && clickOffset < end) {
          await this.openLink(decoration.url, decoration.type, document.uri);
          return; // Only open the first matching link
        }
      }
    }
  }

  /**
   * Opens a link or image based on its URL and type.
   * 
   * @param url - The URL to open
   * @param type - The decoration type ('link' or 'image')
   * @param documentUri - The URI of the current document
   */
  private async openLink(url: string, type: 'link' | 'image', documentUri: vscode.Uri): Promise<void> {
    let target: vscode.Uri | undefined;
    const trimmed = url.trim();

    if (type === 'image') {
      target = resolveImageTarget(trimmed, documentUri);
      if (target) {
        await vscode.commands.executeCommand('vscode.open', target);
      }
    } else if (trimmed.startsWith('#')) {
      // Internal anchor link - navigate within the same document
      const anchor = trimmed.substring(1);
      await vscode.commands.executeCommand('markdown-inline-editor.navigateToAnchor', anchor, documentUri.toString());
    } else if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
      // External URL - open in browser
      target = vscode.Uri.parse(trimmed);
      await vscode.commands.executeCommand('vscode.open', target);
    } else {
      // Relative file path
      const relative = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
      target = vscode.Uri.joinPath(documentUri, '..', relative);
      try {
        await vscode.commands.executeCommand('vscode.open', target);
      } catch (error) {
        // File might not exist, silently fail
        console.warn('Failed to open link:', error);
      }
    }
  }

  /**
   * Disposes of all event listeners.
   */
  dispose(): void {
    this.disposables.forEach(d => d.dispose());
    this.disposables = [];
  }
}
