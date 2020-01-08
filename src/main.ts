import { languages, Position, Range, TextEdit, ExtensionContext } from "vscode";
import * as Prettier from "prettier";

export function activate(context: ExtensionContext) {
    let disposable = languages.registerDocumentFormattingEditProvider("toml", {
        provideDocumentFormattingEdits(document, options, token) {
            const result = [];
            const start = new Position(0, 0);
            const end = new Position(
                document.lineCount - 1,
                document.lineAt(document.lineCount - 1).text.length
            );
            const range = new Range(start, end);
            let text = document.getText(range);
            let fmtText = Prettier.format(text, { filepath: "foo.toml" });
            result.push(new TextEdit(range, fmtText.toString()));
            return result;
        },
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}
