// 🤔 Should I use jest, or plain debugging/console logs?

import * as LogicExecutor from '../LogicExecutor.js';
import * as MessageBlock from '../messageBlock.js';
import * as SwitchBlock from '../SwitchBlock.js';

// logic executor
console.log("<LOGIC EXECUTOR (1)>");
var le = new LogicExecutor.LogicExecutor();
le.code = "op add a 2 3\nprint \"Hello from \"\nprint a\nprint \" lines of code!\"\nprintflush message1";
var a = 5;
var b = Date.now();
console.log(b);
while(a < 5) {
    console.log(le.statement(le.code.split("\n")[le.counter]));
    le.doInstruction();
    a--;
}
console.log(Date.now()-b);
console.log("<LOGIC EXECUTOR (2)>");
le.code = "set x 0\nprint x\nprintflush message1\nop add x x 1\njump 1 lessThan x 20\n\n\n"
var b = Date.now();
console.log(b);
while(le.counter < 5) {
    console.log(le.statement(le.code.split("\n")[le.counter]));
    le.doInstruction();
    a--;
}
console.log(Date.now()-b);
console.log("<LOGIC EXECUTOR (3)>");
le.counter = 0;
le.importCustom('./mods/exampleMod.js');
le.code = "hello\n"
le.doInstruction();

// message block
console.log("\n<MESSAGE BLOCK>");
var msgBlock = new MessageBlock.MessageBlock();
console.log(msgBlock.maxNewLines);
msgBlock.config("Normal text");
console.log(msgBlock.message);
msgBlock.config("220 character limit 01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789AAAAAA");
console.log(msgBlock.message);
msgBlock.config("NewLines limit \n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27");
console.log(msgBlock.message);

// switch block
console.log("\n<SWITCH BLOCK>")
var swBlock = new SwitchBlock.SwitchBlock();
if(swBlock.version() > 1){
    throw new Error("Incompatible switch block version!");
} else console.log("Compability test success ✔")
console.log(swBlock.config());
swBlock.configTapped();
console.log(swBlock.config());
swBlock.configTapped();
console.log(swBlock.config());