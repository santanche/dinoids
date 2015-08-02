var gameStatus = 't';

var theDinoid = null;
var dinoArea;

var commandSvg = null;
var commandSeq = new Command();

var logSvg = null;
var logId = 0;

function startWorld() {
   dinoArea = document.querySelector("#dinoArea");
   theDinoid = new Dinoid(dinoArea, 1, 1, 10, 10);
   new VisualDinoid(theDinoid);
   theDinoid.randomPosition();
   
   var commandBox = document.querySelector("#command");
   commandSvg = document.createTextNode("");
   commandBox.appendChild(commandSvg);

   logSvg = document.querySelector("#log");
}

function addInstr(instr) {
   if (instr === '*') {
      addLog(commandSeq);
      if (gameStatus === 't')
         theDinoid.moveSeq(commandSeq);
      else
         theDinoid.moveSeqS(commandSeq);
      commandSvg.nodeValue = "";
      commandSeq.clear();
      
      // var positionL = theDinoid.getPosition();
      // var positionR = theRobesberto.getPosition();
      // if (positionL.x === positionR.x && positionL.y === positionR.y)
      //   logLine("*** You found Robesberto in " + logId + " movements", logId + 1);
   } else {
      commandSvg.nodeValue += instr;
      commandSeq.addInstr(instr);
   }
}

function addLog(commandSeq) {
   logId++;
   
   logLine((logId + ": " + commandSeq.returnSeq()), logId);
}

function logLine(str, line) {
   var logBox = document.querySelector("#l" + line);
   var logText = document.createTextNode(str);
   logBox.appendChild(logText);
}

function restart(type) {
   var bTest = document.querySelector("#bTest");
   var bPlay = document.querySelector("#bPlay");
   if (type === 't') {
      gameStatus = 't';
      bTest.setAttribute("fill", "#800000");
      bPlay.setAttribute("fill", "#AAAAAA");
   } else {
      gameStatus = 'p';
      theDinoid.scramble();
      bTest.setAttribute("fill", "#AAAAAA");
      bPlay.setAttribute("fill", "#800000");
   }
   cleanup();
}

function cleanup() {
   theDinoid.randomPosition();
   logId = 0;
   
   var l;
   for (l = 1; l <= 14; l++) {
      var logBox = document.querySelector("#l"+l);
      if (logBox != null && logBox.firstChild && logBox.firstChild != null)
         logBox.removeChild(logBox.firstChild);
   }
}
