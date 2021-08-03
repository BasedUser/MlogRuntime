// 😉 Credits: Anuken
// 👨‍💻 Converted from https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/world/blocks/logic/MessageBlock.java

// 👋 Hey, this is untested code.
// Can you please fix some of the issues here, if there are any?
class MessageBlock {
    constructor(){
        this.maxTextLength = 220;
        this.maxNewLines = 24;
    }
    config(tile, text){
        if (text.length > this.maxTextLength){
            return; //no. -Anuken
        }
        /*
         * 😵 Unfortunately, I don't know how to convert this to JS. Credits: Anuken
         * tile.message.ensureCapacity(text.length());
         * tile.message.setLength(0);
        */
        text = text.trim();
        count = 0;
        for(i = 0; i < text.length(); i++){
            c = text.charAt(i);
            if(c == '\n'){
                (count++ <= this.maxNewlines) ? tile.message.append('\n') : 0;
            }
            else{
                tile.message.append(c);
            }
        }
    }
}

class MessageBuild{
    constructor(){
        this.message = "";
    }
}