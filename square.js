function Square(x, y, index) {
    this.playable = true;
    this.x = x + width/4 + 75;
    this.y = y + height/4;
    this.index = index;
    this.boxes = [];
    this.state = 0;
    this.size = lines*lines*10;
    //Creating rows*lines childs for the square
    var indexbox = 0;
    for(var i = 0; i < lines; i++) {
        for(var j= 0; j < rows; j++) {
            this.boxes[indexbox] = new Box(i*lines*10, j*rows*10, indexbox, this.x, this.y);
            indexbox++;
        }
        
    }
    
    this.update = function() {
        
        
//rendering the child boxes
        indexbox = 0;
        for(var i = 0; i < lines; i++) {
        for(var j= 0; j < rows; j++) {
            this.boxes[indexbox].update();
            indexbox++;
            }
        }
// Then rendering the large squares
        
        strokeWeight(5);
        noFill();        
        stroke(200, 200, 10);
        rect(this.x, this.y, this.size, this.size);
        if(this.state == 1) {
            fill(20, 50, 255, 200);
            rect(this.x, this.y, this.size, this.size);

        }
        if(this.state == 2){
            fill(190, 50, 20, 200);
            rect(this.x, this.y, this.size, this.size);
        }
        if(this.state == 3){
            fill(128, 128, 128, 100);
            rect(this.x, this.y, this.size, this.size);
        }
        
    }


}