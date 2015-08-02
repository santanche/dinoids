/*
 * Dinoid
 */

function Dinoid(dinoArea, x, y, limitX, limitY, dinoMatrix) {
   this.x = x;
   this.y = y;
   this.limitX = limitX;
   this.limitY = limitY;
   this.direction = Math.floor(Math.random()*8)+1;
   this.observers = [];
   this.dinoMatrix = dinoMatrix;
}

Dinoid.prototype = {
   observers : null,
   x : 1,
   y : 1,
   limitX : 20,
   limitY : 20,
   direction : 1,
   dinoMatrix : null,
   
   following : null,
   followers : 0,

   subscribe : function(anObserver) {
      this.observers.push(anObserver);
   },
   
   position : function(x, y) {
      this.x = x;
      this.y = y;
      this.notify();
   },
   
   randomPosition : function() {
      this.position(Math.floor((Math.random()*(this.limitX-2))+3),
                    Math.floor((Math.random()*(this.limitY-2))+3));
   },
   
   getPosition : function() {
      return {"x" : this.x,
              "y" : this.y};
   },

   rotate : function() {
      this.direction = (this.direction + 1) % 9;
   },
   
   move : function() {
      var nd = dinoMatrix.neighbor(this.x, this.y, this.direction);
      if (nd != null) {
         // addLog("(" + this.x + "," + this.y + ") f.self " + this.followers + "; f.nd " + nd.followers +
         //       "; f.flw " + ((this.following === null) ? "null" : this.following.followers));
         
         var fNew = nd.followers * 10 + (Math.floor(Math.random()*10)+1);
         var fExisting = ((this.following === null) ? 0 : this.following.followers) *
                         2 + (Math.floor(Math.random()*10)+1);
         
         if (fNew > fExisting) {
            var oldDirection = this.direction;
            if (this.following != null)
               this.following.followers--;
            this.following = nd;
            nd.followers++;
            this.direction = nd.direction;
            // addLog("(" + this.x + "," + this.y + ") = " + oldDirection + " -> " + this.direction);
         }
      }
      if (this.following === null && Math.random() < 0.1)
         this.direction = Math.floor(Math.random()*8)+1;
      
      var nx = this.x;
      var ny = this.y;
      
      switch (this.direction) {
        case 8 : nx = (this.x > 1) ? this.x-1 : this.limitX;
        case 1 : ny = (this.y > 1) ? this.y-1 : this.limitY; break;
        case 2 : ny = (this.y > 1) ? this.y-1 : this.limitY;
        case 3 : nx = (this.x < this.limitX) ? this.x+1 : 1; break;
        case 4 : nx = (this.x < this.limitX) ? this.x+1 : 1;
        case 5 : ny = (this.y < this.limitY) ? this.y+1 : 1; break;
        case 6 : ny = (this.y < this.limitY) ? this.y+1 : 1;
        case 7 : nx = (this.x > 1) ? this.x-1 : this.limitX; break;
      }
      
      if (dinoMatrix.get(nx, ny) === null) {
         dinoMatrix.set(this.x, this.y, null);
         this.x = nx;
         this.y = ny;
         dinoMatrix.set(this.x, this.y, this);
      }
      
      this.notify();
   },
   
   notify : function() {
      var position = {"x" : this.x,
                      "y" : this.y};
      for (obs in this.observers) {
         this.observers[obs].update(position);
      }
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
         this.svgDinoid.setAttribute("x", (position.x - 1) * 25);
         this.svgDinoid.setAttribute("y", (position.y - 1) * 25);
      }
   }
};