/**
 * terminal-interface.h
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

#include <stdio.h>
#include <string.h>

#include "LogicExecutor.h"
#include "messageBlock.h"
#include "SwitchBlock.h"

LogicExecutor processor;
MessageBlock msgblock;
SwitchBlock swblock;
char lastLine[226];
int relativeLines = 0;
int numLines = 0;
int targetLine = 0;
int limit;
char* deconstructed[1000];
int editLine;

/* debugInstructions = 0b1000
 * totalLines = 0b0100
 * relativeLines = 0b0010
 * clearOnRun = 0b0001 */

// haha 2D array go brr
const char* displaySettings_name[] = {"debugInstructions","totalLines","relativeLines","clearOnRun"};
unsigned char displaySettings_state = 0b0110;

void tickSetting(int settingIndex){
    displaySettings_state ^= 1 << (sizeof(displaySettings_name) - settingIndex);
    printf("Successfully ticked %s.\n",displaySettings_name[settingIndex]);
}

int main(){
    printf("\x1b[32mWelcome!\x1b[0m\nFormat: \x1b[33mtotal lines \x1b[32mrelative lines \x1b[0m>\n");
    while(1){
        printf("%s%s> ",displaySettings_state & 0b0100 ? ("\x1b[33m${numLines}\x1b[0m") : "",
                        displaySettings_state & 0b0010 ? ("\x1b[32m${numLines}\x1b[0m") : "");
        fgets(lastLine, sizeof(lastLine), stdin);
        // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        if(strcmp(lastLine,"run")){
            if(displaySettings_state & 0b0001) printf("\e[1;1H\e[2J"); /* clear screen */
            targetLine = processor.counter + relativeLines;
            while(processor.counter < targetLine) {
                if(displaySettings_state & 0b1000) printf("\e[42m DEBUG: \e[0m%i | %s\n", processor.counter, processor.statement(strtok(processor.code, '\n')[processor.counter]));
                processor.doInstruction();
            }
            relativeLines = 0;
        } else if (strcmp(lastLine, "run-all")){
            //TODO: add run-all-limit
            if(displaySettings_state & 0b0001) printf("\e[1;1H\e[2J"); /* clear screen */
            printf("Instruction limit: ");
            scanf("%i", &limit);
            targetLine = processor.counter + relativeLines;
            processor.counter = 0;
            while(processor.counter < targetLine && limit--) {
                if(displaySettings_state & 0b1000) printf("\e[42m DEBUG: \e[0m%i | %s\n", processor.counter, processor.statement(strtok(processor.code, '\n')[processor.counter]));
                processor.doInstruction();
            }
            relativeLines = 0;
        } else if (strcmp(lastLine, "run-limit")){
            if(displaySettings_state & 0b0001) printf("\e[1;1H\e[2J"); /* clear screen */
            printf("Instruction limit: ");
            scanf("%i", &limit);
            while(processor.counter < targetLine && limit--) {
                if(displaySettings_state & 0b1000) printf("\e[42m DEBUG: \e[0m%i | %s\n", processor.counter, processor.statement(strtok(processor.code, '\n')[processor.counter]));
                processor.doInstruction();
            }
            relativeLines = 0;
        } else if (strcmp(lastLine, "exit")) return 0;
        else if (strcmp(lastLine, "check printB")) {
            printf("%s\n",processor.printB);
        } else if (strcmp(lastLine, "settings")) {
            // print the table
            for(int index = 0; index < sizeof(displaySettings_name); ++index){
                printf("| %-3i | %-17s | %-3i |",index,displaySettings_name[index],!!(displaySettings_state & (4 - index)));
            }
            int p;
            printf("Tick a setting: ");
            scanf("%i", &p);
            if ((p < sizeof(displaySettings_name)) && (p >= 0)) tickSetting(p);
        } else if (strcmp(lastLine, "full code")) {
            printf(processor.code);
        } else if (strcmp(lastLine, "edit line")) {
            deconstructed = strtok(processor.code, "\n");
            printf("These are the lines of code avaliable.");
            for(int i = 0; i < sizeof(strtok(processor.code, "\n"));++i){
                printf("\e[43m%i \e[42m|\e[0m %s\n", i, deconstructed[i]);
            }
            //TODO: finish
        }
    //         case "edit line":
    //             deconstructed = processor.code.split("\n");
    //             console.log("These are the lines of code avaliable.");
    //             for(let i = 0; i < deconstructed.length; i++){
    //                 console.log(`\x1b[33m${i}\x1b[0m | ${deconstructed[i]}`);
    //             }
    //             editLine = prompt("What line of code do you want to edit? ")
    //             while(!isNaN(parseInt(editLine))){
    //                 editLine = parseInt(editLine);
    //                 deconstructed[editLine] = prompt(`\x1b[33m${editLine}\x1b[0m >> `);
    //                 editLine = prompt("What line of code do you want to edit? ")
    //             }
    //             processor.code = deconstructed.join("\n");
    //             break;
    //         case "blackhole":
    //             if(prompt("\x1b[31mTHIS WILL DELETE ALMOST ALL OF YOUR DATA. ARE YOU SURE? (yes/other) ").toLowerCase() === "yes"){
    //                 numLines = 0;
    //                 relativeLines = 0;
    //                 lastLine = "";
    //                 processor = new LogicExecutor.LogicExecutor();
    //             }
    //             break;
        else if (strcmp(lastLine, "clear")){
            printf("\e[1;1H\e[2J");
        }
        //TODO: implement
        // case "import":
        //     processor.importCustom(prompt("[|] << (path) "));
        //     break;
        else {
            ++relativeLines;
            ++numLines;
            processor.code = strcat(processor.code, strcat(lastLine, "\n"));
        }
    }
}