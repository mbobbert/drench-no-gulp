
var divs = []; //multi-dimensional array of div's (the squares)
var colors = []; //multi-dimensional array of colours that are a second layer on top of the squares
var all_colors = ['#CF7210', '#1C1219', '#C3845F', '#B16C53', '#F5BA00', '#F0C6E2'];

/**
 * Shuffle the 6 colors and assign a shuffled color to each coordinate on the multi-dimensional array of colours
 */
function randomizeColors() {
    for (var x = 0; x < 14; x++) {
        colors[x] =[];  //initiate the multi-dimensional color array

        for (var y = 0; y < 14; y++ ){
            all_colors = shuffle(all_colors);   //shuffle the current 6 colors
            var current_color = all_colors[0];  //take 1 of these 6 colors and store it in variable
            colors[x][y] = current_color;       //assign that current color to a coordinate
        };
    }
}

/**
 * Create the coordinates of the board, and assign a square to each coordinate
 */
function drawBoard() {
    var board = $('#board');
    board.empty();

    for (var y = 0; y < 14; y++) {  //y-axis create 14 rows

        for(var x = 0; x < 14; x++) {    // x-axis create 14 squares per row
            var square = $('<div class="square"></div>');  //create 196 divs with class 'square'
            square.appendTo(board);   //append the squares to the board
            square.css('background-color', colors[x][y]);   // assign a color to each square
        }
    }
}

/**
 * Initiates the drenching of the board starting at the upper-left corner
 */
function drench(color) {
    var current_color = colors[0][0];
    if (current_color == color) { return; }

    drenchSquare(0, 0, current_color, color);

    drawBoard();
}

/**
 * Changes the color of the specific square
 */

function drenchSquare(x, y, from_color, to_color) {
    if(x >=0 && x <= 13 && y >=0 && y <=13 && colors[x][y] == from_color)
    {
        colors[x][y] = to_color;

        drenchSquare(x+1, y, from_color, to_color);
        drenchSquare(x-1, y, from_color, to_color);
        drenchSquare(x, y+1, from_color, to_color);
        drenchSquare(x, y-1, from_color, to_color);

    }
}

/**
 * Standard function to shuffle an array
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Gives each color button a background-color
 */
$('#btn-1').css('background-color', '#CF7210');
$('#btn-2').css('background-color', '#1C1219');
$('#btn-3').css('background-color', '#C3845F');
$('#btn-4').css('background-color', '#B16C53');
$('#btn-5').css('background-color', '#F5BA00');
$('#btn-6').css('background-color', '#F0C6E2');

/**
 * When a color-button is clicked, it performs the drench function
 */
$("#btn-1").on('click', function() {
    $(this).trigger(drench('#CF7210'));
})

$("#btn-2").on('click', function() {
    $(this).trigger(drench('#1C1219'));
})

$("#btn-3").on('click', function() {
    $(this).trigger(drench('#C3845F'));
})

$("#btn-4").on('click', function() {
    $(this).trigger(drench('#B16C53'));
})

$("#btn-5").on('click', function() {
    $(this).trigger(drench('#F5BA00'));
})

$("#btn-6").on('click', function() {
    $(this).trigger(drench('#F0C6E2'));
})

 /**
  * Upon each click in the board, make sure that the number of trials is decreased by 1
  */

$("#board").on('click', decreaseTrials)

function decreaseTrials () {
    var startNumber = $("#trials").html();
    var endNumber = 0;
    startNumber --
    //for (var number = startNumber; number >= endNumber; number --) {
        if (startNumber >= endNumber ) {
        $("#trials").html(startNumber);
        console.log(startNumber);
        } else $('#game-over').removeClass('hidden');
        ;
}

/**
 * Once the reset-button is clicked, make sure that:
 */

$('#reset').on('click', resetGame)
// 1/2. The number of trials is reset to 30

function resetGame() {
    $("#trials").html(30);

// 2/2. The 196 squares are randomly filled with one of six colors
    randomizeColors();
    drawBoard();
    $("#game-over").addClass('hidden');

};