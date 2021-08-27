using namespace std;

class SwitchBlock {
    public:
        void SwitchBlock(){
            enabled = true;
        }

        // It's more fitting to name them these.
        bool set(bool b){
            enabled = b;
            return enabled;
        }
        bool tap(){
            return set(!enabled);
        }
        bool get(){
            return enabled;
        }
        int version(){
            return 1;
        }
    private:
        bool enabled = true;
};