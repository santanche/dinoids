/*
 * Dinoid
 */

function Dinoid(dinoArea, x, y, limitX, limitY) {
   this.x = x;
   this.y = y;
   this.limitX = limitX;
   this.limitY = limitY;
}

Dinoid.prototype = {
   observers : [],
   x : 1,
   y : 1,
   limitX : 10,
   limitY : 10,

   subscribe : function(anObserver) {
      this.observers.push(anObserver);
   },
   
   position : function(x, y) {
      this.x = x;
      this.y = y;
      this.notify();
   },
   
   move : function(moveType) {
      switch (moveType) {
        case '<' : if (this.x > 1) this.x--; break;
        case '>' : if (this.x < this.limitX) this.x++; break;
        case '^' : if (this.y > 1) this.y--; break;
        case 'v' : if (this.y < this.limitY) this.y++; break;
      }
      this.notify();
   },
   
   moveSeq : function(commandSeq) {
      var sequence = commandSeq.returnSeq();
      var s;
      for (s = 0; s < sequence.length; s++)
         this.move(sequence.charAt(s));
   },
   
   notify : function() {
      var position = {"x" : this.x,
                      "y" : this.y};
      for (obs in this.observers) {
         this.observers[obs].update(position);
      }
   },

   randomPosition : function() {
      this.position(Math.floor((Math.random()*(this.limitX-2))+3),
                    Math.floor((Math.random()*(this.limitY-2))+3));
   },
   
   getPosition : function() {
      return {"x" : this.x,
              "y" : this.y};
   }
};

/*
 * Visual Dinoid
 */

function VisualDinoid(theDinoid) {
   this.svgDinoid = document.createElementNS("http://www.w3.org/2000/svg", "use");
   this.svgDinoid.setAttributeNS("http://www.w3.org/1999/xlink", "href", "dinoid.svg#dinoidBody");
   this.svgDinoid.setAttribute("x", "0");
   this.svgDinoid.setAttribute("y", "0");
   this.svgDinoid.setAttribute("width", "25");
   this.svgDinoid.setAttribute("height", "25");
   dinoArea.appendChild(this.svgDinoid);
   
   if (theDinoid && theDinoid != null)
      theDinoid.subscribe(this);
}

VisualDinoid.prototype = {
   svgDinoid : null,
   
   update : function(position) {
      if (position && position != null && this.svgDinoid != null) {
         this.svgDinoid.setAttribute("x", (position.x - 1) * 50);
         this.svgDinoid.setAttribute("y", (position.y - 1) * 50);
      }
   }
};