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
 *     You can view more at the cheat sheet.
 * 
 * HOW TO RUN:
 *     You can use one of the commands below:
 *     node ./terminal-inteface.js
 *     npm run emulation
 */

import * as LogicExecutor from './LogicExecutor.js';
// import * as MessageBlock from './messageBlock.js';
// import * as SwitchBlock from './SwitchBlock.js';
import * as promptSync from 'prompt-sync';

var processor = new LogicExecutor.LogicExecutor();
// var mblock = new MessageBlock.MessageBlock();
// var sblock = new SwitchBlock.SwitchBlock();
const prompt = promptSync.default({sigint:true});
var lastLine = "";
var relativeLines = 0;
var numLines = 0;
var displaySettings = {
    debugInstructions : false,
    totalLines : true,
    relativeLines : true,
    clearOnRun : false
}
var targetLine = 0;
var limit;
var deconstructed;
var editLine;
console.log("\x1b[32mWelcome!\x1b[0m\nFormat: \x1b[33mtotal lines \x1b[32mrelative lines \x1b[0m>")
while(lastLine != "exit"){
    lastLine = prompt((displaySettings.totalLines ? (`\x1b[33m${numLines}\x1b[0m `) : "")
                    + (displaySettings.relativeLines ? (`\x1b[32m${relativeLines}\x1b[0m `) : "")
                    + "> ");
    switch(lastLine){
        case "run":
            if(displaySettings.clearOnRun){console.clear()}
            targetLine = processor.counter + relativeLines;
            while(processor.counter < targetLine) {
                if(displaySettings.debugInstructions){
                    console.log(processor.counter + " | " + processor.statement(processor.code.split("\n")[processor.counter]));
                }
                processor.doInstruction();
            }
            relativeLines = 0;
            break;
        case "run-all":
            if(displaySettings.clearOnRun){console.clear()}
            limit = prompt("Instruction limit (leave blank for infinite limit): ");
            limit = (limit == "") ? true : Number(limit)
            targetLine = processor.counter + relativeLines;
            processor.counter = 0;
            while(processor.counter < targetLine && limit) {
                if(displaySettings.debugInstructions){
                    console.log(processor.counter + " | " + processor.statement(processor.code.split("\n")[processor.counter]));
                }
                processor.doInstruction();
                (limit === true) ? 0 : limit--;
            }
            relativeLines = 0;
            break;
        case "run-limit":
            if(displaySettings.clearOnRun){console.clear()}
            limit = Number(prompt("Limit (number of instructions): [   ]\b\b\b\b"))
            targetLine = processor.counter + relativeLines;
            while(processor.counter < targetLine && limit) {
                if(displaySettings.debugInstructions){
                    console.log(processor.counter + " | " + processor.statement(processor.code.split("\n")[processor.counter]));
                }
                processor.doInstruction();
                limit--;
            }
            relativeLines = 0;
            break;
        case "exit":
            break;
        case "check printB":
            console.log(processor.printB);
            break;
        case "settings":
            console.log(`\x1b[31mWhat settings do you want to tick?\x1b[33m\n[0] (${displaySettings.totalLines}) Total Lines\n\x1b[32m[1] (${displaySettings.relativeLines}) Relative Lines\x1b[0m\n[2] (${displaySettings.debugInstructions}) Debug instructions\n[3] (${displaySettings.clearOnRun} Clear on run related command)`);
            switch(prompt("[ ]\b\b")){
                case "0":
                    displaySettings.totalLines = !displaySettings.totalLines;
                    console.log("Successfully ticked total lines.")
                    break;
                case "1":
                    displaySettings.relativeLines = !displaySettings.relativeLines;
                    console.log("Successfully ticked relative lines.")
                    break;
                case "2":
                    displaySettings.debugInstructions = !displaySettings.debugInstructions;
                    console.log("Successfully ticked debug instructions.")
                    break;
                case "3":
                    displaySettings.clearOnRun = !displaySettings.clearOnRun;
                    console.log("Successfully ticked clear on run.")
                    break;
                default:
                    break;
            }
            break;
        case "full code":
            console.log(processor.code);
            break;
        case "edit line":
            deconstructed = processor.code.split("\n");
            console.log("These are the lines of code avaliable.");
            for(let i = 0; i < deconstructed.length; i++){
                console.log(`\x1b[33m${i}\x1b[0m | ${deconstructed[i]}`);
            }
            editLine = prompt("What line of code do you want to edit? ")
            while(!isNaN(parseInt(editLine))){
                editLine = parseInt(editLine);
                deconstructed[editLine] = prompt(`\x1b[33m${editLine}\x1b[0m >> `);
                editLine = prompt("What line of code do you want to edit? ")
            }
            processor.code = deconstructed.join("\n");
            break;
        case "blackhole":
            if(prompt("\x1b[31mTHIS WILL DELETE ALMOST ALL OF YOUR DATA. ARE YOU SURE? (yes/other) ").toLowerCase() === "yes"){
                numLines = 0;
                relativeLines = 0;
                lastLine = "";
                processor = new LogicExecutor.LogicExecutor();
            }
            break;
        case "clear":
            console.clear();
            break;
        default:
            relativeLines += 1;
            numLines += 1;
            processor.code += lastLine + "\n";
            break;
    }
}