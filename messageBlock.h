// 😉 Credits: Anuken
// 👨‍💻 Converted from https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/world/blocks/logic/MessageBlock.java

#ifndef MessageBlock

typedef struct MessageBlock {
    unsigned int enabled : 1;
    char message[220] = {'\0'};
    void (*config)(struct MessageBlock *, char* newMessage) = config;
} MessageBlock;

void trimMessage(char* out, char* text){
    // out and text must have length 220

    int start,end;
    for(start = 0; text[start] == ' '; ++start);
    for(end = 220; text[end] == ' '; ++end);

    /* TODO: find a way to optimize this */
    int delta = end - start;
    int index;
    for(index = 0; index < delta; ++index){
        out[start + index] = text[start + index];
    }
    out[++index] = '\0';
    return;
}

void config(struct MessageBlock * msgblock, char* newMessage){
    const int maxTextLength = 220;
    const int maxNewLines = 24;
    int len;
    for(len = 0; newMessage[len] != '\0'; ++len);
    if(len > maxTextLength) return; //no. -Anuken
    int countNewLines = 0, i;
    for(i = 0; newMessage[i] != '\0'; ++i){
        char c = newMessage[i];
        if(c == '\n'){
            if(countNewLines++ <= maxNewLines) msgblock->message[i] = '\n';
        } else msgblock->message[i] = c;
    }
    msgblock->message[++i] = '\0';
    return;
}

#endif