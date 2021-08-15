// 🤔 Should I use jest, or plain debugging/console logs?

import * as LogicExecutor from '../LogicExecutor.js';
import * as MessageBlock from '../messageBlock.js';
import * as SwitchBlock from '../SwitchBlock.js';

// logic executor
console.log("<LOGIC EXECUTOR>");
var le = new LogicExecutor.LogicExecutor();
le.code = "op add a 2 3\nprint \"Hello from \"\nprint a\nprint \" lines of code!\"\nprintflush message1";
var a = 5;
var b = Date.now();
console.log(b);
while(a>0) {
    console.log(le.statement(le.code.split("\n")[le.counter]));
    le.doInstruction();
    a--;
}
console.log(Date.now()-b);

// message block
console.log("\n<MESSAGE BLOCK>");
var msgBlock = new MessageBlock.MessageBlock();
console.log(msgBlock.maxNewLines);
var msgBuild = new MessageBlock.MessageBuild();
msgBlock.config(msgBuild, "Normal text");
console.log(msgBuild.message);
msgBlock.config(msgBuild, "220 character limit 01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789AAAAAA");
console.log(msgBuild.message);
msgBlock.config(msgBuild, "NewLines limit \n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27");
console.log(msgBuild.message);

// switch block
console.log("\n<SWITCH BLOCK>")
var swBlock = new SwitchBlock.SwitchBlock();
var swBuild = new SwitchBlock.SwitchBuild();
console.log(swBuild.config());
swBuild.configTapped(swBlock);
console.log(swBuild.config());
swBuild.configTapped(swBlock);
console.log(swBuild.config());