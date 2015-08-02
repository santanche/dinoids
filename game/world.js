var gameStatus = 's';

var dinoArea;

var dinoMatrix;
var limitX = 20,
    limitY = 20;
var dinoList;

var logSvg = null;
var logId = 0;
var nextLogId = 1;

var thread;

var totalDinoids = 10;
var mainDinoid = null;

var gameStep = 0;

function startWorld() {
   dinoArea = document.querySelector("#dinoArea");
   dinoMatrix = new Space(limitX, limitY);
   dinoList = [];

   for (d = 1; d <= totalDinoids; d++) {
      var theDinoid = new Dinoid(dinoArea, 1, 1, limitX, limitY);
      new VisualDinoid(theDinoid);
      var colision = true;
      while (colision) {
         theDinoid.randomPosition();
         var position = theDinoid.getPosition();
         if (dinoMatrix.get(position.x, position.y) === null) {
            dinoMatrix.set(position.x, position.y, theDinoid);
            colision = false;
         }
      }
      this.dinoList.push(theDinoid);
      if (mainDinoid === null)
         mainDinoid = theDinoid;
   }
   
   logSvg = document.querySelector("#log");
}

function addLog(str) {
   logId = nextLogId;
   nextLogId = nextLogId % 16 + 1;
   
   logLine(str, logId);
   deleteLine(nextLogId);
}

function logLine(str, line) {
   var logBox = document.querySelector("#l" + line);
   var logText = document.createTextNode(str);
   logBox.appendChild(logText);
}

function deleteLine(line) {
   var logBox = document.querySelector("#l" + line);
   if (logBox != null && logBox.firstChild && logBox.firstChild != null)
      logBox.removeChild(logBox.firstChild);
}

function startStop() {
   var bPlay = document.querySelector("#bPlay");
   if (gameStatus === 's') {
      gameStatus = 'p';
      bPlay.setAttribute("fill", "#800000");
      playing();
   } else {
      gameStatus = 's';
      bPlay.setAttribute("fill", "#AAAAAA");
      clearTimeout(thread);
   }
}

function playing() {
   thread = setTimeout("playing()", 100);
   gameStep++;
   addLog("Step: " + gameStep);
   checkEnd();
   
   allMove();
}

function allMove() {
   for (dino in dinoList)
      dinoList[dino].move();
}

function bomb() {
   gameStep += 100;
   cleanup();
   addLog("*** Bomb -- Step: " + gameStep);
   for (d = 0; d < totalDinoids; d++)
      if (Math.random() < 0.3)
         dinoList[d].direction = Math.floor(Math.random()*8)+1;
}

function cleanup() {
   logId = 0;
   nextLogId = 1;
   
   var l;
   for (l = 1; l <= 16; l++) {
      var logBox = document.querySelector("#l"+l);
      if (logBox != null && logBox.firstChild && logBox.firstChild != null)
         logBox.removeChild(logBox.firstChild);
   }
}

function checkEnd() {
   var dir = dinoList[0].direction;
   var t = 1;
   for (d = 1; d < totalDinoids; d++)
      if (dir === dinoList[d].direction) t++;
   if (t === 10) {
      clearTimeout(thread);
      cleanup();
      addLog("*** Terminou -- Step: " + gameStep);
   }
      
}