import * as vscode from 'vscode';
import { MarkdownParser, type DecorationRange } from './parser';
import { mapNormalizedToOriginal } from './position-mapping';
import { getCachedDecorations, resolveImageTarget, shouldSkipInDiffView } from './hover-utils';

/**
 * Provides an image preview hover for markdown image constructs.
 *
 * Shows the rendered image when hovering the image alt text (the decorated range).
 */
export class MarkdownImageHoverProvider implements vscode.HoverProvider {
  private parser = new MarkdownParser();
  private cache = new Map<string, { version: number; decorations: DecorationRange[] }>();

  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    if (document.languageId !== 'markdown') {
      return;
    }

    if (shouldSkipInDiffView(document)) {
      return;
    }

    if (token.isCancellationRequested) {
      return;
    }

    const text = document.getText();
    if (token.isCancellationRequested) {
      return;
    }
    const decorations = getCachedDecorations(document, this.parser, this.cache);
    const hoverOffset = document.offsetAt(position);
    const config = vscode.workspace.getConfiguration('markdownInlineEditor');
    const singleClickEnabled = config.get<boolean>('links.singleClickOpen', false);

    for (const decoration of decorations) {
      if (token.isCancellationRequested) {
        return;
      }

      if (decoration.type !== 'image' || !decoration.url) {
        continue;
      }

      // Map normalized positions (parser) to original document offsets (VS Code)
      const start = mapNormalizedToOriginal(decoration.startPos, text);
      const end = mapNormalizedToOriginal(decoration.endPos, text);

      if (hoverOffset < start || hoverOffset >= end) {
        continue;
      }

      const target = resolveImageTarget(decoration.url, document.uri);
      if (!target) {
        return;
      }

      // Render the image inside the hover with size constraints.
      const targetUri = escapeHtmlAttribute(target.toString(true));
      const markdown = new vscode.MarkdownString(
        `<img src="${targetUri}" style="max-width: 400px; max-height: 300px;" />`
      );
      markdown.appendText(`\n\nImage URL: ${decoration.url}`);
      if (!singleClickEnabled) {
        markdown.appendMarkdown('\n\n*Direct click disabled (enable in settings).*');
      }
      markdown.supportHtml = true;
      markdown.isTrusted = target.scheme === 'file' || target.scheme === 'vscode-remote';

      const hoverRange = new vscode.Range(document.positionAt(start), document.positionAt(end));
      return new vscode.Hover(markdown, hoverRange);
    }

    return;
  }

}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

