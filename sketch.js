var squares = [];
var indexvalue;
var lines = 3;
var rows = 3;
var oneclick = 0;
var turnindex = -1;
var turn = 0;
var grid = [];
var freeturn = false;
var endGame = false;
function setup() {
    createCanvas(700, 700);
    background(51);
    strokeWeight(3);

    rectMode(CENTER);
// Setting up the large squares hierarchy
    indexvalue = 0;
    for(var i = 0; i < lines; i++) {
        for (var j = 0; j< rows; j++) {
            
            squares.push(new Square(i*lines*lines*10, j*rows*rows*10, indexvalue));
            indexvalue++;

        }
        
    }
}

function draw() {
// Updating thelarge squares, which will then update the smaller ones they contain
    indexvalue = 0;
    console.log(squares[0].boxes[0].state);
  
    for(var i = 0; i < squares.length; i++) {
        for(var j = 0; j < squares[i].boxes.length; j++) {
        squares[i].boxes[j].update();
        }
    }
    for(var i = 0; i< lines; i++) {
        for (var j = 0; j< rows; j++) {
            squares[indexvalue].update();
            indexvalue++;
        }
  }
// Coloring the playable squares in yellow
    for(var i = 0; i< squares.length; i++) {
    if(squares[turnindex]) {
        if(squares[turnindex].state != 0) {
        freeturn = true;
            }
        }
    }
    for(var i = 0; i< squares.length; i++) {
        if(squares[i].index == turnindex) {
            stroke(20, 255, 40);
            rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size);
        }
    }
    if(turnindex == -1 || freeturn) {
        for(var i = 0; i< squares.length; i++) {
            if(squares[i].state == 0) {
            stroke(20, 255, 40);
            rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size);
            }
            
        }
        for(var i = 0; i< squares.length; i++) {
        if(squares[i].state != 0) {
                stroke(200, 200, 10);
                rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size);

            }
        }
    }
    
// Ending the game here in order to let the animations finish before freezing the screen
    if(endGame) {
    noLoop();
    }
    
// The main part of the program: detecting click events and drawing crosses or circles 
    
    for(var i = 0; i< squares.length; i++) {
       if((freeturn && turnindex != squares[i].index)||turnindex == -1 || turnindex == squares[i].index && squares[i].state == 0) {
           for(var j = 0; j < squares[i].boxes.length; j++) {
           let boxj = squares[i].boxes[j];
           if(mouseX < boxj.x + boxj.size/2 && mouseX > boxj.x - boxj.size/2
              && mouseY < boxj.y + boxj.size/2 && mouseY > boxj.y - boxj.size/2
              && oneclick == 1 && boxj.state == 0) {
               console.log('clicked in box ' + j);
               turnindex = j;
               if(turn % 2 == 0) {
                   
                   boxj.state = 1;
                   
               }else {
                  
                   boxj.state = 2;
               }
               var sqchildren = squares[i].boxes;
               
               for(var k = 0; k < sqchildren.length; k++) {
                   grid.push(sqchildren[k].state);
// We have created an array containing all states of the selected square
                   // looks like [
//                   1, 1, 0,
//                   3, 2, 1,
//                   2, 0, 1
//                   ]
               }
                   if((grid[0] == grid[8] && grid[0] == grid[4] && grid[0] != 0 && squares[i].state == 0)
                    || (grid[6] == grid[4] && grid[6] == grid[2] && grid[6] != 0 && squares[i].state == 0)
                    || (grid[0] == grid[1] && grid[0] == grid[2] && grid[0] != 0 && squares[i].state == 0)
                    || (grid[3] == grid[4] && grid[3] == grid[5] && grid[3] != 0 && squares[i].state == 0)
                    || (grid[6] == grid[7] && grid[6] == grid[8] && grid[6] != 0 && squares[i].state == 0)
                    || (grid[0] == grid[3] && grid[0] == grid[6] && grid[0] != 0 && squares[i].state == 0)
                    || (grid[1] == grid[4] && grid[1] == grid[7] && grid[1] != 0 && squares[i].state == 0)
                    || (grid[2] == grid[5] && grid[2] == grid[8] && grid[2] != 0 && squares[i].state == 0)) {
                       if(turn % 2 == 0) {
                           squares[i].state = 1;
                           
                       }else{
                           squares[i].state = 2;
                           
                       }
                   }
               var fullcount = 0;
               for(var l = 0; l < grid.length; l++) {
                   if(grid[l] == 0) {
                       break;
                   }else{
                       fullcount++;
                   }
               }
               if(fullcount == grid.length) {
                   squares[i].state = 3;
               }
               console.log(grid);
               turn += 1;
           }               
           }
       }
        grid = [];
    }
// checking for a full win situation
    var sgrid = [];
for(var s = 0; s < squares.length; s++) {
    sgrid.push(squares[s].state);
}
    if((sgrid[0] == sgrid[8] && sgrid[0] == sgrid[4] && sgrid[0] != 0 && sgrid[0] != 3)
       || (sgrid[6] == sgrid[4] && sgrid[6] == sgrid[2] && sgrid[6] != 0 && sgrid[0] != 3)
       || (sgrid[0] == sgrid[1] && sgrid[0] == sgrid[2] && sgrid[0] != 0 && sgrid[0] != 3)
       || (sgrid[3] == sgrid[4] && sgrid[3] == sgrid[5] && sgrid[3] != 0 && sgrid[0] != 3)
       || (sgrid[6] == sgrid[7] && sgrid[6] == sgrid[8] && sgrid[6] != 0 && sgrid[0] != 3)
       || (sgrid[0] == sgrid[3] && sgrid[0] == sgrid[6] && sgrid[0] != 0 && sgrid[0] != 3)
       || (sgrid[1] == sgrid[4] && sgrid[1] == sgrid[7] && sgrid[1] != 0 && sgrid[0] != 3)
       || (sgrid[2] == sgrid[5] && sgrid[2] == sgrid[8] && sgrid[2] != 0 && sgrid[0] != 3)) {
        if(turn % 2 == 0) {
            textSize(32);
            fill(255, 20, 0);
            text("Player 2 won!", width/2 - 100, height*0.75);
                   
               }else {
            textSize(32);
            fill(0, 20, 255);
            text("Player 1 won!", width/2 - 100, height*0.75);
               }
        endGame = true;
    }
    oneclick = 0;
    freeturn = false;
    
}



function mousePressed() {
   oneclick = 1;
}