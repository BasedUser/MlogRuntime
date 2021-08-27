// 😉 Credits: Anuken
// 👨‍💻 Converted from https://github.com/Anuken/Mindustry/blob/master/core/src/mindustry/world/blocks/logic/MessageBlock.java

#include <string>
using namespace std;

string trim(string s){
    string whitespace = " \n\t\r";
    int first = 0;
    for(int i = 0; i < s.length();i++){
        if(string(whitespace).find(s[i]) || 0){
            first = i;
            break;
        }
    }
    if(first == s.length()-1){
        return "";
    }

    int last = s.length() - 1;
    for(int i = s.length() - 1; i >= 0;i--){
        if(string(whitespace).find(s[i]) || 0){
            last = i;
            break;
        }
    }

    return s[first,last];
}

class MessageBlock {
    public:
        string message = "";
        int maxTextLength = 220;
        int maxNewLines = 24;
        MessageBlock(){}
        void config(string text){
            if (text.length() > maxTextLength){
                return; //no. -Anuken
            }
            message = "";
            text = text;
            int count = 0;
            for(int i = 0; i < text.length(); i++){
                int c = text[i];
                if(c == '\n'){
                    if(count++ <= maxNewLines){
                        message += '\n';
                    }
                }
                else{
                    message += c;
                }
        }
    }
};