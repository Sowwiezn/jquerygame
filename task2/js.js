let timeStorage = localStorage;
let time;

    if (timeStorage.getItem("timer") != null) {
        time = parseInt(timeStorage.getItem("timer"));
    } else {
        time = 10;
        timeStorage.setItem("timer", time);
    }

let rand = Math.floor(1+Math.random() * 15)	

let ans = ["гарри поттер", "губка боб", "пираты",
            "симпсоны", "звездные войны", "король лев", 
            "холодное сердце", "шрек", "шрек", "рокки", 
            "индиана джонс", "один дома", "терминатор", 
            "назад в будущее", "охотники за привидениями", 
          ]

let progress = 0
let was = []

$(document).ready(function(){

	$(".timer").knob({
		'bgColor': '#C8B3D3',
		'width': 140,
		'fgColor': '#BDA8C8',
		'max': 60,
		'min': 0,
	})

	$(".bttn").click(function(){
		$(".rules").slideToggle()
	})
	startAudio(rand)
	$(".bttn2").click(function(){
		if ($(".inp").val() == `${ans[rand-1]}`) {
			alertify.success("Correct")
			$(".inp").val("")
			progress++
			$(".progress").val(progress).trigger('change')
			was.push(rand)

			if (progress < 5) {
				do {
					rand = Math.floor(1+Math.random() * 15)
				}
				while (was.includes(rand))
				console.log(rand)
				startAudio(rand)
			}
			else{
			$(".sound, .bttn2, .inp").css({
				'display': 'none'
			})
			$("#next").css({
				'display': 'flex'
			})
			localStorage.removeItem("timer")
			}
		}
		
		else{
			alertify.error("Incorrect")
		}
	})

	$(".start").click(function(){
		$(".start").css("display", "none")
		$(".sound").css("display", "flex")
		startAudio(rand)
		startTime()
	})

	$(".progress").knob({
		'bgColor': '#CFBBDA',
		'width': 120,
		'angleOffset': 280,
		'angleArc': 160,
		'lineCap': 'round',
		'fgColor': '#B297BF',
		'max': 5,
		'displayInput': false

	})

	
})

function startAudio(arg){
	$("#melody").attr("src", `sound/${arg}.mp3`)

}

function startTime () {
    setInterval(function () {
        time = parseInt(localStorage.getItem("timer")) - 1;
        $(".timer").val(time).trigger('change');
        if (time == 0) {
            alertify.error("Time is out!");
            setTimeout(() => window.open("index.html", "_self", false), 2000);
            localStorage.removeItem("timer");
        } else if (time > 0) {
            localStorage.setItem("timer", time);
        }
    }, 1000);
}
