/**
 * terminal-interface.js
 * Made by: code-explorer786 (https://github.com/code-explorer786)
 * Date of creation: 17-08-2021
 * Time of creation: 4:41 GMT (11:41 in the author's timezone)
 * 
 * Command-line "REPL" created for easier code execution,
 * just insert the code in and enjoy.
 * 
 * HOW TO USE:
 *     Insert the code. You can copy-paste.
 *     Type "run-all" and hit Enter.
 *     To check printB, simply type "check printB" and hit Enter.
 *     If you want to exit, simply type "exit" and hit Enter.
 * 
 * HOW TO RUN:
 *     You can use one of the commands below:
 *     node ./terminal-inteface.js
 *     npm run emulation
 */

import * as LogicExecutor from './LogicExecutor.js';
import * as MessageBlock from './messageBlock.js';
import * as SwitchBlock from './SwitchBlock.js';
import * as promptSync from 'prompt-sync';

var processor = new LogicExecutor.LogicExecutor();
var mblock = new MessageBlock.MessageBlock();
var messageblock = new MessageBlock.MessageBuild();
var sblock = new SwitchBlock.SwitchBlock();
var switchblock = new SwitchBlock.SwitchBuild();
const prompt = promptSync.default({sigint:true});
var lastLine = "";
var a;
while(lastLine != "exit"){
    lastLine = prompt("> ");
    switch(lastLine){
        case "run-all":
            a = (processor.code.match(/'\n'/g) || []).length + 1;
            while(a>0) {
                console.log(processor.statement(processor.code.split("\n")[processor.counter]));
                processor.doInstruction();
                a--;
            }
            break;
        case "exit":
            break;
        case "check printB":
            console.log(processor.printB);
            break;
        default:
            processor.code += lastLine + "\n";
            break;
    }
}