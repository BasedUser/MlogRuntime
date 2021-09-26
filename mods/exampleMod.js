/*
 * Example mod.
 * Please finish the mod implementation.
*/

function Instruction(tokens){
    switch(tokens[0]){
        case "hello":
            console.log("Hello World!");
            break;
    }
}

export {Instruction};