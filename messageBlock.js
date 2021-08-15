// 😉 Credits: Anuken
// 👨‍💻 Converted from https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/world/blocks/logic/MessageBlock.java

class MessageBlock {
    constructor(){
        this.maxTextLength = 220;
        this.maxNewLines = 24;
    }
    config(tile, text){
        if (text.length > this.maxTextLength){
            return; //no. -Anuken
        }
        tile.message = "";
        text = text.trim();
        let count = 0;
        for(let i = 0; i < text.length; i++){
            let c = text.charAt(i);
            if(c == '\n'){
                if(count++ <= this.maxNewLines){
                    tile.message += '\n';
                }
            }
            else{
                tile.message += c;
            }
        }
    }
}

class MessageBuild{
    constructor(){
        this.message = "";
    }
}

export {MessageBlock, MessageBuild};