// Preface: Written for Chrome/Firefox/Safari/Terminal (Node JS)
// Fuck IE. All my homies hate IE.
class LogicExecutor {
	   maxInstructions = 1000;
	   maxGraphicsBuffer = 256;
	   maxDisplayBuffer = 1024;
	   maxTextBuffer = 256;
	   constVars = new Map([
	       ["true", 1],
	       ["false", 0],
	       ["null", null],
	       ["Infinity", null],
	       ["-Infinity", null],
	       ["NaN", null]
	   ]);
	   lambdaVars = new Map([
        ["@this", ()=>{return this}],
        ["@time", ()=>{return Date.now()}],
        ["@counter", ()=>{return this.counter + 1}],
        ["@unit", ()=>{return this.unit}]
    ]);
	   ipt = 2;
	   vars;// = new Map();
	   code = "";
	   printB = "";
	   displayB;
	   counter = 0;
	   links;// = new Map(); // TODO: bind to cells
	   unit = null;
	   printDebug = true;
	   customMods = [];
	   constructor(ipt) {
	       this.ipt = ipt;
	       this.constVars.set("@ipt", ipt);
	       this.vars = new Map();
	       this.links = new Map();
	       //initializeContent(); // put lots of global constants in
	       return this;
	   }
	   
	   error(message) {
	       throw "Invalid code. " + message;
	   }
	   
	   lstring(line, pos) {
	       let from = pos;
	       while(pos++ < line.length) {
	           let c = line[pos];
	           if(c == '\n') {
	               error("Missing closing quote \" before end of line.");
	           } else if(c == '"') {
	               break;
	           } 
        } if(line[pos] != '"') error("Missing closing quote \" before end of file.");
        return [line.slice(from, pos+1).replace("\\n", "\n"), pos+1];
	   }

	   ltoken(line, pos){
        let from = pos;

        while(pos < line.length){
            let c = line[pos];
            if(c == '\n' || c == ' ' || c == '#' || c == '\t' || c == ';') break;
            pos++;
        }

        return [line.slice(from, pos), pos];
    }
    deepEqual(x, y) { // used in object comparisons
        const ok = Object.keys, tx = typeof x, ty = typeof y;
        return x && y && tx === 'object' && tx === ty ? ( ok(x).length === ok(y).length && ok(x).every(key => deepEqual(x[key], y[key])) ) : (x === y);
    } // credit to atmin@SO
    
    doOp(operator, c, d) {
        let a = parseFloat(this.getVar(c));
        let b = parseFloat(this.getVar(d));
        let numberCmp = isFinite(a) && isFinite(b);
        	let sign, ah, al; // do not implement
        switch(operator) {
        	    case "add": return numberCmp ? a + b : null; // fuck you no "a" + "b"
        	    case "sub": return numberCmp ? a - b : null;
        	    case "mul": return numberCmp ? a * b : null;
        	    case "div": return numberCmp ? a / b : null;
        	    case "idiv": return numberCmp ? Math.floor(a / b) : null;
        	    case "mod": return numberCmp ? a % b : null; // FIXME if it diverges from java
        	    case "pow": return numberCmp ? Math.pow(a, b) : null;
        	    case "equal": return numberCmp ? (Math.abs(a - b) < 0.000001 ? 1 : 0) : (c === d); // what the hell is this, anuke
        	    case "notEqual": return numberCmp ? (Math.abs(a - b) < 0.000001 ? 0 : 1) : c === d; 
        	    case "land": numberCmp ? (a != 0 && b != 0 ? 1 : 0) : null;
        	    case "lessThan": return numberCmp ? (a < b ? 1 : 0) : null;
        	    case "lessThanEq": return numberCmp ? (a <= b ? 1 : 0) : null;
        	    case "greaterThan": return numberCmp ? (a > b ? 1 : 0) : null;
        	    case "greaterThanEq": return numberCmp ? (a >= b ? 1 : 0) : null;
        	    case "strictEqual": return numberCmp ? a === b : deepEqual(c, d);
        	    
        	    // REPLACE THIS ASAP
        	    case "shr": //AGDGSGDHSHD
        	        if(b<0) return this.doOp("shl",a,0-b);
        	        sign = a < 0 ? -1 : 1;
        	        al = (a>>>b).toString(2);
        	        ah = (Math.floor(a / 4294967296)>>>0).toString(2);
        	        ah = ah.slice(1);
        	        return parseInt(ah+al,2);
        	    case "shl":
        	        if(b<0) return this.doOp("shr",a,0-b);
        	        sign = a < 0 ? "1" : "0";
        	        al = (a>>>0).toString(2);
        	        ah = (Math.floor(a / 4294967296)>>>0).toString(2).slice(0-b);
        	        return parseInt(ah+al+sign.repeat(b),2);
        	    // I originally planned to put condition and logic ops here as well - but my sanity ran out. DO YOU SEE THESE BITSHIFTS?
        	    default:
        	        return null;
        	    break;
        }
    }
    
	   statement(line) {
	       let expectNext = false;
	       let tok = 0;
	       let pos = 0;
	       let tokens = [];
	       while(pos < line.length) {
	           let c = line[pos];
	           if(tok >= 16) error("Line too long; may only contain " + 16 + " tokens");

	           //reached end of line, bail out.
	           if(c == '\n' || c == ';') break;

	           if(expectNext && c != ' ' && c != '#' && c != '\t') {
	           	    this.error("Expected space after string/token. " + tokens);
            }
	           expectNext = false;
	           if(c == '#') {
	               break; // line done
	           } else if(c == '"') {
	               let r = this.lstring(line, pos);
	               tokens[tok++] = r[0];
	               pos = r[1];
	               expectNext = !expectNext;
	           } else if(c != ' ' && c != '\t') {
	           	   let r = this.ltoken(line, pos);
	               tokens[tok++] = r[0];
	               pos = r[1];
	               expectNext = !expectNext;
	           } else {
	               pos++;
	           }
	       }
	       return tokens;
	   }
	   
	   getVar(name) {
	       if(isFinite(name) || isFinite(parseFloat(name))) // just in case
	       	    return parseFloat(name);
	       if(name.charAt(0) === "\"" && name.charAt(name.length-1) === "\"")
	           return name.slice(1,-1);
	       if(this.constVars.has(name))
	       	    return this.constVars.get(name); // if a constant name slips into vars somehow, ignore it
	       if(this.lambdaVars.has(name))
	       	    return this.lambdaVars.get(name)(); // oh shit oh fuck
	       if(this.vars.has(name))
	       	    return this.vars.get(name);
	       return null;
	   }
	   setVar(name, value) {
	       if(this.constVars.has(name) || isFinite(name) || name[0] === "\"") {
	       	    return; // can't set a constant
	       }
	       if(isFinite(parseFloat(value))) {
	       	    if(name === "@counter") {
	       	        this.counter = parseInt(value)%maxInstructions;
	       	        return;
	       	    }
	       	    this.vars.set(name, value);
	       	    return;
	       } else { // it's an object/string with a
	           if(value == null) { // null
	               this.vars.set(name, null);
	               return;
	           } else if(value.charAt(0) === "\"" && value.charAt(-1) === "\"") {
	       	        // string
	       	        this.vars.set(name, value);
	       	        return;
	       	    } else { // var/invalids
	       	        this.vars.set(name, this.getVar(value));
	       	        return;
	       	    }
	       }
	   }

	   doInstruction() {
	       let line = this.code.split("\n")[this.counter];
	       let tokens = this.statement(line); // tokenize this line
	       switch(tokens[0]) {
	           case "set":
	               if(tokens.length > 2)this.setVar(tokens[1],tokens[2]);
	           break;
	           case "op":
	               if(tokens.length > 4)this.setVar(tokens[2],this.doOp(tokens[1], tokens[3], tokens[4]));
	           break;
	           case "jump":
	               if(tokens.length > 4) {if(this.doOp(tokens[2], tokens[3], tokens[4])) {
	                   this.counter = parseFloat(tokens[1])-1; // -1 because of the counter++ just later
	               }}
				   break;
	           case "end":
	               this.counter = -1;
	           break;
	           case "print":
	               if(tokens.length > 1)this.printB += this.getVar(tokens[1]);
	               this.printB = this.printB.slice(0,this.maxTextBuffer);
	           break;
	           case "printflush":
	               if(this.printDebug){if(tokens.length > 1)console.log(tokens[1] + ": " + this.printB);} // replace this with a bind to links (and putting them in this.vars)
	               this.printB = "";
	           break;
			   default:
				   for(let mod of this.customMods){
					    let results = mod.Instruction(tokens);
						if(!(results === null)){break}
				   }
			   break;
	       }
	       this.counter++;
	       if(this.counter >= this.code.split("\n").length) {
	       	    this.counter = 0; // reset
	       }
	   }

	   //TODO: finish
	   importCustom(modPath){
		   (async ()=>{
			   let mod = await import(modPath);
			   await this.customMods.push(mod);
			   console.log(this.customMods);
		   })()
	   }
}

export {LogicExecutor};
