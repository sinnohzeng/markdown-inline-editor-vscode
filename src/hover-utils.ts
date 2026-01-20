import * as vscode from 'vscode';
import type { DecorationRange, MarkdownParser } from './parser';

type CacheEntry = {
  version: number;
  decorations: DecorationRange[];
};

const MAX_DECORATION_CACHE_ENTRIES = 20;

/**
 * Returns true when we should skip hover behavior in diff views.
 */
export function shouldSkipInDiffView(document: vscode.TextDocument): boolean {
  const config = vscode.workspace.getConfiguration('markdownInlineEditor');
  const diffViewApplyDecorations = config.get<boolean>('defaultBehaviors.diffView.applyDecorations', false);

  if (!diffViewApplyDecorations) {
    const diffSchemes: readonly string[] = ['git', 'vscode-merge', 'vscode-diff'];
    if (diffSchemes.includes(document.uri.scheme)) {
      return true;
    }
  }

  return false;
}

/**
 * Returns cached decorations for the current document version, recomputing as needed.
 */
export function getCachedDecorations(
  document: vscode.TextDocument,
  parser: MarkdownParser,
  cache: Map<string, CacheEntry>
): DecorationRange[] {
  const cacheKey = document.uri.toString();
  const cached = cache.get(cacheKey);
  if (cached && cached.version === document.version) {
    return cached.decorations;
  }

  try {
    const text = document.getText();
    const decorations = parser.extractDecorations(text);
    cache.set(cacheKey, { version: document.version, decorations });
    if (cache.size > MAX_DECORATION_CACHE_ENTRIES) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey) {
        cache.delete(oldestKey);
      }
    }
    return decorations;
  } catch (error) {
    console.warn('Failed to parse markdown for hover:', error);
    return [];
  }
}

/**
 * Resolves an image URL to a URI for hover/click behavior.
 */
export function resolveImageTarget(url: string, documentUri: vscode.Uri): vscode.Uri | undefined {
  const trimmed = url.trim();
  if (!trimmed) {
    return;
  }

  if (trimmed.startsWith('/')) {
    return vscode.Uri.file(trimmed);
  }

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('file:')
  ) {
    try {
      return vscode.Uri.parse(trimmed);
    } catch {
      return;
    }
  }

  return vscode.Uri.joinPath(documentUri, '..', trimmed);
}
