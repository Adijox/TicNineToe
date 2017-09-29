function Box(x, y, index, parentx, parenty) {
    this.playable = true;
    this.x = x + parentx - lines*10;
    this.y = y + parenty - rows*10;
    this.index = index;
    this.state = 0;
    this.size = 10 * lines;
// cross is 1 and circle is 2
    
    
    this.update = function () {
        
            strokeWeight(3);
            stroke(255);
            noFill();
            rect(this.x, this.y, this.size, this.size);
        if(this.state == 1) {
            noFill();
            stroke(0, 20, 255);
            line(this.x - this.size/2 + 8, this.y - this.size/2 + 8, this.x + this.size/2 - 8, this.y + this.size/2 - 8);
                   line(this.x - this.size/2 + 8, this.y + this.size/2 - 8, this.x + this.size/2 - 8, this.y - this.size/2 + 8);
        }
        if(this.state == 2) {
            noFill();
            stroke(255, 20, 0);
            ellipse(this.x, this.y, this.size/2);
        }
    }

}