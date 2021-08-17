// 😉 Credits: Anuken
// 👨‍💻 Converted from https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/world/blocks/logic/MessageBlock.java

class MessageBlock {
    constructor(){
        this.message = "";
        this.maxTextLength = 220;
        this.maxNewLines = 24;
    }
    config(text){
        if (text.length > this.maxTextLength){
            return; //no. -Anuken
        }
        this.message = "";
        text = text.trim();
        let count = 0;
        for(let i = 0; i < text.length; i++){
            let c = text.charAt(i);
            if(c == '\n'){
                if(count++ <= this.maxNewLines){
                    this.message += '\n';
                }
            }
            else{
                this.message += c;
            }
        }
    }
}

export {MessageBlock};