#ifndef SwitchBlock

typedef struct SwitchBlock {
    unsigned int enabled : 1;
    const int version = 1;

    // TODO: be incosistent with the mindustry source code to avoid this bloat (idk what to do)
    void (*set)(struct SwitchBlock *, unsigned int enabled) = setSwitch;
    unsigned int (*get)(struct SwitchBlock *) = getSwitch;
    unsigned int (*tap)(struct SwitchBlock *) = tapSwitch;
} SwitchBlock;

void setSwitch(struct SwitchBlock * swblock, unsigned int enabled){
    swblock->enabled = enabled;
    return;
}

unsigned int getSwitch(struct SwitchBlock * swblock){
    return swblock->enabled;
}

unsigned int tapSwitch(struct SwitchBlock * swblock){
    swblock->enabled = !(swblock->enabled);
    return swblock->enabled;
}

#endif