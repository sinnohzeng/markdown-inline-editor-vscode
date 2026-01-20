import * as vscode from 'vscode';
import { MarkdownParser, type DecorationRange } from './parser';
import { mapNormalizedToOriginal } from './position-mapping';
import { getCachedDecorations, shouldSkipInDiffView } from './hover-utils';

/**
 * Provides a hover that shows the target URL for markdown links.
 */
export class MarkdownLinkHoverProvider implements vscode.HoverProvider {
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

      if (decoration.type !== 'link' || !decoration.url) {
        continue;
      }

      const start = mapNormalizedToOriginal(decoration.startPos, text);
      const end = mapNormalizedToOriginal(decoration.endPos, text);

      if (hoverOffset < start || hoverOffset >= end) {
        continue;
      }

      const markdown = new vscode.MarkdownString();
      markdown.appendText(`Link URL: ${decoration.url}`);
      if (!singleClickEnabled) {
        markdown.appendMarkdown('\n\n*Direct click disabled (enable in settings).*');
      }
      const hoverRange = new vscode.Range(document.positionAt(start), document.positionAt(end));
      return new vscode.Hover(markdown, hoverRange);
    }

    return;
  }
}
