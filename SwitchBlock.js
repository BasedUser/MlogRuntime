class SwitchBlock {
    constructor(){}
    configure(entity, b){
        entity.enabled = b;
    }
}

class SwitchBuild {
    constructor(){
        this.enabled = true;
    }
    configTapped(switchBlock){
        switchBlock.configure(this,!this.enabled);
        return false;
    }
    config(){
        return this.enabled;
    }
    version(){
        return 1;
    }
}

export {SwitchBlock, SwitchBuild};