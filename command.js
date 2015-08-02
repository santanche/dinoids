function Command() {
}

Command.prototype = {
      
   sequence : "",
   
   addInstr : function(instr) {
      this.sequence += instr;
   },
   
   returnSeq : function() {
      return this.sequence;
   },
   
   clear : function() {
      this.sequence = "";
   }
   
};