let rand = Math.floor(1+Math.random() * 12)	

let ans = ["яблоко","груша","город","школа","сайт", "браузер", "плагин", "цвет", "стиль", "язык", "узор", "сорока"]
let progress = 0
let was = []

$(document).ready(function(){
	$(".bttn").click(function(){
		$(".rules").slideToggle()
	})
	startRebus(rand)
	$(".bttn2").click(function(){
		if ($(".inp").val().toLowerCase() == `${ans[rand-1]}`) {
			alertify.success("Correct")
			$(".inp").val("")
			progress++
			$(".progress").val(progress).trigger('change')
			was.push(rand)

			if (progress < 5) {
				do {
					rand = Math.floor(1+Math.random() * 12)
				}
				while (was.includes(rand))
				console.log(rand)
				startRebus(rand)
			}
			else{
			$(".img, .bttn2, .inp").css({
				'display': 'none'
			})
			$("#next").css({
				'display': 'flex'
			})
			}
		}
		
		else{
			alertify.error("Incorrect")
		}
	})

	$(".progress").knob({
		'bgColor': '#BBDAD8',
		'width': 120,
		'angleOffset': 280,
		'angleArc': 160,
		'lineCap': 'round',
		'fgColor': '#97BFBD',
		'max': 5

	})
})

function startRebus(arg){
	$("#img").attr("src", `rebuses/${arg}.jpg`)

}


