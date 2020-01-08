import {
    CancellationToken,
    ExtensionContext,
    FormattingOptions,
    languages,
    Position,
    ProviderResult,
    Range,
    TextDocument,
    TextEdit,
} from "vscode";
import * as Prettier from "prettier";

export function activate(context: ExtensionContext) {
    context.subscriptions.push(
        languages.registerDocumentFormattingEditProvider("toml", {
            provideDocumentFormattingEdits(
                document: TextDocument,
                options: FormattingOptions,
                _token: CancellationToken
            ): ProviderResult<TextEdit[]> {
                const start = new Position(0, 0);
                const end = new Position(
                    document.lineCount - 1,
                    document.lineAt(document.lineCount - 1).text.length
                );
                const range = new Range(start, end);
                const text = document.getText(range);
                const fmtText = Prettier.format(text, {
                    filepath: "foo.toml",
                    tabWidth: options.tabSize,
                    useTabs: !options.insertSpaces,
                    endOfLine: "auto",
                });
                return [new TextEdit(range, fmtText)];
            },
        })
    );
}

export function deactivate() {}
