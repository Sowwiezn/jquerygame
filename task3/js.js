let timeStorage = localStorage;
let time;

    if (timeStorage.getItem("timer") != null) {
        time = parseInt(timeStorage.getItem("timer"));
    } else {
        time = 60;
        timeStorage.setItem("timer", time);
    }
    
    let firstCard = null
    let secondCard = null

let cards = [
  {
    name: "php",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
    id: 1,
  },
  {
    name: "css3",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
    id: 2
  },
  {
    name: "html5",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
    id: 3
  },
  {
    name: "jquery",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
    id: 4
  }, 
  {
    name: "javascript",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
    id: 5
  },
  {
    name: "node",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
    id: 6
  },
  {
    name: "photoshop",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
    id: 7
  },
  {
    name: "python",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
    id: 8
  },
  {
    name: "rails",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
    id: 9
  },
  {
    name: "sass",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
    id: 10
  },
  {
    name: "sublime",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
    id: 11
  },
  {
    name: "wordpress",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
    id: 12
  }
];

let progress = 0
let was = []

$(document).ready(function(){

	$(".timer").knob({
		'bgColor': '#C9DB9F',
		'width': 140,
		'fgColor': '#B9CC8B',
		'max': 60,
		'min': 0,
	})

	$(".bttn").click(function(){
		$(".rules").slideToggle()
	})

	$(".start").click(function(){
		$(".start").css("display", "none")
		fillBoard()
		startTime()
		$(".card").on("click", cradClick)
	})

	$(".progress").knob({
		'bgColor': '#C9DB9F',
		'width': 120,
		'angleOffset': 280,
		'angleArc': 160,
		'lineCap': 'round',
		'fgColor': '#B9CC8B',
		'max': 12,
		'displayInput': false

	})
})

function fillBoard(){
	let board = shuffle([...cards, ...cards])
	for (i = 0; i < board.length; i++) {
		let cardHtml = `<div class= "card" data-id= "${board[i].id}">
		<div class= "front">Flip</div>
		<div class= "back"><img src="${board[i].img}" alt="${board[i].name}"></div>
		</div>`
		$(".gameBoard").append(cardHtml)
	}
}
function shuffle(array){
	let counter = array.length
	let temp
	let index
	while (counter > 0){
		index = Math.floor(Math.random() * counter)
		counter--
		temp = array[counter]
		array[counter] = array[index]
		array[index] = temp
	}
	return array
}
function cradClick(event){
	if (secondCard || $(this).hasClass("correct")) {
		return
	}
	if (!firstCard) {
		firstCard = $(this)
		firstCard.addClass("flip")
		return
	}
	if (firstCard) {
		secondCard = $(this)
		secondCard.addClass("flip")
		if (firstCard.attr("data-id") == secondCard.attr("data-id")){
			firstCard.addClass("correct")
			secondCard.addClass("correct")
			firstCard = null
			secondCard = null
			progress++
			$(".progress").val(progress).trigger("change")
			if (progress == 12) {
				win()
			}
		return
		}
		else {
			setTimeout(function(){
				firstCard.removeClass("flip")
				secondCard.removeClass("flip")
				firstCard = null
				secondCard = null
			}, 600)
		}
	}
}
function win(){

}
function startTime () {
    setInterval(function () {
        time = parseInt(localStorage.getItem("timer")) - 1;
        $(".timer").val(time).trigger('change');
        if (time == 0) {
            alertify.error("Time is out!");
            setTimeout(() => window.open("task3.html", "_self", false), 2000);
            localStorage.removeItem("timer");
        } else if (time > 0) {
            localStorage.setItem("timer", time);
        }
    }, 1000);
}