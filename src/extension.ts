// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let json2url = vscode.commands.registerCommand('json2url', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('json to url plugin working !');

		let currentEditor = vscode.window.activeTextEditor;
		let currentDocument = currentEditor?.document;
		let inputText;
		let selection = currentEditor?.selection;
		if(selection?.isEmpty){
			inputText = currentDocument?.getText();
		}else{
			inputText = currentDocument?.getText(selection);
		}
		
		if (undefined !== inputText) {
			let url = '';
			let jsonObject:any = JSON.parse(inputText);
			Object.keys(jsonObject).forEach(k => {
				url = url + '&' + encodeURIComponent(k) + '=' + encodeURIComponent(jsonObject[k]);
			})
			currentEditor?.edit(function(editBuilder){
				if( undefined == selection ||  selection.isEmpty){
					let lineCount = currentDocument?.lineCount;
					if(undefined !== lineCount){
						let allRange = new vscode.Range(new vscode.Position(0,0),new vscode.Position(lineCount,0))
						editBuilder.replace(allRange,url);
					}
				}else{
					editBuilder.replace(selection,url);
				}

			})
		}
	});

	context.subscriptions.push(json2url);

	let url2json = vscode.commands.registerCommand('url2json', () => {

		let currentEditor = vscode.window.activeTextEditor;
		let currentDocument = currentEditor?.document;
		let inputText:string|undefined;
		let selection = currentEditor?.selection;
		if(selection?.isEmpty){
			inputText = currentDocument?.getText();
		}else{
			inputText = currentDocument?.getText(selection);
		}

		if( undefined !== inputText){
			let kvPairs = inputText.trim().split('&');
			kvPairs = kvPairs.filter(pair => pair.includes('='))
			console.log(kvPairs);
			let jsonObject:any = {};
			if(kvPairs.length > 0){
				kvPairs.map(pair => {
					let kv = pair.split('=');
					if(2 == kv.length){
						jsonObject[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]);
					}
				})
			}
			let jsonString = JSON.stringify(jsonObject,null,4)
			currentEditor?.edit(function(editBuilder){
				if( undefined == selection ||  selection.isEmpty){
					let lineCount = currentDocument?.lineCount;
					if(undefined !== lineCount){
						let allRange = new vscode.Range(new vscode.Position(0,0),new vscode.Position(lineCount,0))
						editBuilder.replace(allRange,jsonString);
					}
				}else{
					editBuilder.replace(selection,jsonString);
				}

			})
		}





		vscode.window.showInformationMessage('url to json plugin working !');
	});

	context.subscriptions.push(url2json);
}

// this method is called when your extension is deactivated
export function deactivate() {}
