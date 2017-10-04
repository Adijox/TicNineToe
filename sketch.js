var squares = [];
var indexvalue;
var lines = 3;
var rows = 3;
var oneclick = 0;
var turnindex = -1;
var turn = 0;
var grid = [];
var sgrid = [];
var freeturn = false;
var endGame = false;

//setInterval(timer, 500);
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
    background(40);
// Updating thelarge squares, which will then update the smaller ones they contain
    indexvalue = 0;  
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
            noFill();
            rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size);
        }
        if(squares[i].index == turnindex) {
            console.log(squares[i].state);
        }
    }
    if(turnindex == -1 || freeturn) {
        for(var i = 0; i< squares.length; i++) {
            if(squares[i].state == 0) {
                noFill();
            stroke(20, 255, 40);
            rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size);
            }
            
        }
        for(var i = 0; i< squares.length; i++) {
        if(squares[i].state != 0) {
            noFill();
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
  loop1:  
    for(var i = 0; i< squares.length; i++) {
       if(((freeturn && squares[i].state == 0) && turnindex != squares[i].index)||turnindex == -1 || turnindex == squares[i].index && squares[i].state == 0) {
           for(var j = 0; j < squares[i].boxes.length; j++) {
           var boxj = squares[i].boxes[j];
           if(mouseX < boxj.x + boxj.size/2 && mouseX > boxj.x - boxj.size/2
              && mouseY < boxj.y + boxj.size/2 && mouseY > boxj.y - boxj.size/2
              && oneclick == 1 && boxj.state == 0 && squares[i].state == 0) {
               console.log('clicked in box ' + j);
               turnindex = j;
               if(turn % 2 == 0) {
                   
                   squares[i].boxes[j].state = 1;
                   
               }else {
                  
                   squares[i].boxes[j].state = 2;
                   
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
                           if(squares[i].state == 0) {
                           squares[i].state = 1;
                               print('new square locked in blue : ' + i);
                               turn++;
                               grid = [];

                               break loop1;
                           }
                       }else{
                           if(squares[i].state == 0) {
                           squares[i].state = 2;
                               print('new square locked in red : ' + i);
                               turn++;
                               grid = [];

                               break loop1;
                           }
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
    sgrid = [];
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
            noStroke();
            fill(255, 20, 0);
            text("Player 2 won!", width/2 - 100, height*0.75);
            fill(255, 150, 0);
            textSize(24);
            text('(in ' + turn + ' turns)',  width/2 - 60, height*0.80);
                   
               }else {
            noStroke();
            textSize(32);
            fill(0, 20, 255);
            text("Player 1 won!", width/2 - 100, height*0.75);
            fill(0, 150, 255);
            textSize(24);
            text('(in ' + turn + ' turns)',  width/2 - 60, height*0.80);
               }
        endGame = true;
    }
    oneclick = 0;
    freeturn = false;
    
}



function mousePressed() {
   oneclick = 1;
}

/*function timer() {
    if(typeof(sgrid) != 'undefined')
    print(sgrid);
}*/