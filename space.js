function Space(limitX, limitY) {
   this.limitX = limitX;
   this.limitY = limitY;
   this.matrix.length = this.limitX * this.limitY;
   
   for (i = 0; i < this.matrix.length; i++)
      this.matrix[i] = null;
}

Space.prototype = {
   limitY   : 20,
   limitX : 20,
   matrix : [],
   
   set : function(x, y, aDinoid) {
      this.matrix[(x-1) * this.limitX + (y-1)] = aDinoid;
   },
   
   get : function(x, y) {
      var dino = ((x-1) < this.limitX && (y-1) < this.limitY) ? this.matrix[(x-1) * this.limitX + (y-1)] : null;
      return dino;
   },
   
   neighbor : function(x, y, direction) {
      var d = direction;
      var n = null;
      for (r = 0; r < 8 && n === null; r++) {
         var xv = x - 1;
         var yv = y - 1;
         switch (d) {
            case 8 : xv--;
            case 1 : yv--; break;
            case 2 : yv--;
            case 3 : xv++; break;
            case 4 : xv++;
            case 5 : yv++; break;
            case 6 : yv++;
            case 7 : xv--; break;
         }
         d = (d % 8) + 1;
         n = (xv >= 0 && xv < this.limitX && yv >= 0 && yv < this.limitY) ? this.matrix[xv * this.limitX + yv] : null;
      }
      return n;
   }
   
};