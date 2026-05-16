$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});

$(document).ready(function(){
	var vw;
	var MOBILE_MAX = 430;
	var BALLOON_W_DESKTOP = 100;
	var BALLOON_W_MOBILE = 58;

	function balloonWidth() {
		return $(window).width() <= MOBILE_MAX ? BALLOON_W_MOBILE : BALLOON_W_DESKTOP;
	}

	function randomBalloonPosition() {
		var w = $(window).width();
		var h = $(window).height();
		var bw = balloonWidth();
		var maxLeft = Math.max(0, w - bw - 4);
		var maxBottom = Math.max(60, h * 0.5);
		return {
			left: Math.random() * maxLeft,
			bottom: 20 + Math.random() * maxBottom
		};
	}

	function startBalloonLoop(selector) {
		function loop() {
			var pos = randomBalloonPosition();
			$(selector).animate(pos, 10000, loop);
		}
		loop();
	}

	function layoutWishBalloons() {
		var w = $(window).width();
		var h = $(window).height();
		var ids = ['#b11', '#b22', '#b33', '#b44', '#b55', '#b66', '#b77'];
		if (!$(ids[0]).length) {
			return;
		}
		var bw = balloonWidth();
		var n = ids.length;
		var top = Math.min(w <= MOBILE_MAX ? 120 : 200, h * 0.2);
		var gap = Math.max(2, (w - n * bw) / (n + 1));

		ids.forEach(function (sel, i) {
			$(sel).stop().animate({
				top: top,
				left: gap + i * (bw + gap),
				bottom: 'auto'
			}, 500);
		});
	}

	$(window).on('resize orientationchange', function () {
		layoutWishBalloons();
	});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').removeClass('peach-after');
		$('body').css('background', 'linear-gradient(165deg, #fff5f8 0%, #ffe8f0 45%, #ffe4ec 100%)');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

	$('#play').click(function(){
		var audio = $('.song')[0];
		audio.play();
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('background', 'linear-gradient(165deg, #fff5f8 0%, #ffe8f0 45%, #ffe4ec 100%)');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$('.jennie-row').addClass('is-visible').fadeIn(1200);
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	$('#balloons_flying').click(function(){
		var borderTop = -Math.min(500, $(window).height() * 0.55);
		$('.balloon-border').animate({ top: borderTop }, 8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		startBalloonLoop('#b1');
		startBalloonLoop('#b2');
		startBalloonLoop('#b3');
		startBalloonLoop('#b4');
		startBalloonLoop('#b5');
		startBalloonLoop('#b6');
		startBalloonLoop('#b7');

		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});

	$('#cake_fadein').click(function(){
		$('.jennie-row').fadeOut(300).addClass('is-hidden');
		$('.cake-stage').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.jennie-row').fadeOut(400).addClass('is-hidden');
		$('.cake-cover').addClass('candles-glow focus-cake');
		
		// Light all candles with staggered animation
		$('.candle').each(function(index) {
			var $candle = $(this);
			setTimeout(function() {
				$candle.addClass('is-lit');
			}, index * 150);
		});
		
		var $cover = $('.cake-cover');
		if ($cover.length) {
			$('html, body').animate({
				scrollTop: Math.max(0, $cover.offset().top - 24)
			}, 450);
		}
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

	$('#wish_message').click(function(){
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22');
		$('#b3').attr('id','b33');
		$('#b4').attr('id','b44');
		$('#b5').attr('id','b55');
		$('#b6').attr('id','b66');
		$('#b7').attr('id','b77');
		layoutWishBalloons();
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});

	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake-stage').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});

		var $wishLines = $('.message-card p');

		function msgLoop (i) {
			if (i >= $wishLines.length) {
				$wishLines.last().fadeOut('slow').promise().done(function () {
					$('.cake-stage').fadeIn('fast');
					// Re-light all candles when cake reappears
					$('.candle').addClass('is-lit');
				});
				return;
			}
			$wishLines.eq(i).fadeIn('slow').delay(2200).promise().done(function () {
				if (i < $wishLines.length - 1) {
					$wishLines.eq(i).fadeOut('slow').promise().done(function () {
						msgLoop(i + 1);
					});
				} else {
					msgLoop(i + 1);
				}
			});
		}

		$wishLines.hide();
		msgLoop(0);
	});
});
