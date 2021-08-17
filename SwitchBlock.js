class SwitchBlock {
    constructor(){
        this.enabled = true;
    }
    configure(b){
        this.enabled = b;
    }
    configTapped(){
        this.configure(!this.enabled);
        return false;
    }
    config(){
        return this.enabled;
    }
    version(){
        return 1;
    }
}

export {SwitchBlock};