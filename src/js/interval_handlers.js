//Flash.ScaleDegrees
$(document).ready(function () {

	if (!Modernizr.canvas) {
		$('#nocanvas_frame').show();
	}
	else {
		//soundManager.url = '../../games/Audio/soundmanager/swf';
		//soundManager.flashVersion = 9; // optional: shiny features (default = 8)
		//soundManager.useFlashBlock = true; // optionally, enable when you're ready to dive in
		/*
		 * read up on HTML5 audio support, if you're feeling adventurous.
		 * iPad/iPhone and devices without flash installed will always attempt to use it.
		*/
		/*
		soundManager.onready(function() {
			// Ready to use; soundManager.createSound() etc. can now be called.
			for (var i = 0; i < Flash.Interval.intervalSounds.table.length; i++) {
				var name = Flash.Interval.intervalSounds.table.sounds[i].name;
				var soundUrl = '../../games/Audio/notes/' + name + '_piano.mp3';
				Flash.Interval.intervalSounds.table.sounds[i].sound = soundManager.createSound({
						id: name,
						url: soundUrl
					});
			}
		});
		*/

		cfg = new Games.Notation.Config();
		statusModel = new Flash.Interval.StatusModel();
		statusView = new Flash.Interval.StatusView();
		notationModel = new Games.Notation.NotationModel();
		notationController = new Games.Notation.NotationController(cfg.MIN_RANGE);
		gameController = new Flash.Interval.GameController();

		$('#menu_frame').show();

		$('#play_button').click(function () {
			gameController.displayGame();
		});
		$('#play_button').keydown(function (event) {
			var code = parseInt(event.keyCode);
			if (code === cfg.UP_KEY) {
				$('#show_top_scores_button').focus();
			}
			if (code === cfg.DOWN_KEY) {
				$('#instructions_button').focus();
			}
		});
		$('#instructions_button').click(function () {
			$('#menu_frame').hide();
			$('#instructions_frame').show();
			$('#back_button').focus();
		});
		$('#instructions_button').keydown(function (event) {
			var code = parseInt(event.keyCode);
			if (code === cfg.UP_KEY) {
				$('#play_button').focus();
			}
			if (code === cfg.DOWN_KEY) {
				$('#show_top_scores_button').focus();
			}
		});
		$('#back_button').click(function () {
			$('#instructions_frame').hide();
			$('#menu_frame').show();
			$('#play_button').focus();
		});
		$('#show_top_scores_button').click(function () {
			Games.Common.processFinalScore();
		});
		$('#show_top_scores_button').keydown(function (event) {
			var code = parseInt(event.keyCode);
			if (code === cfg.UP_KEY) {
				$('#instructions_button').focus();
			}
			if (code === cfg.DOWN_KEY) {
				$('#play_button').focus();
			}
		});

		$('#session_start_button').click(function () {
			$('#session_frame').hide();
			statusModel.setIsTimeout(false);
			$('#game_frame').show();
			$('#staff_paper').show();
			gameController.startGame();
		});
		$('#session_end_button').click(function () {
			$('#session_frame').hide();
			Games.Common.displaySummary();
			$('#sum_continue_button').focus();
		});
		$('.input').click(function () {
			var $input = $(this);
			var code = $input.attr('value');
			gameController.continueGame(code);
		});
		$('#scores_button').click(function () {
			$('#session_frame').hide();
			Games.Common.processFinalScore();
		});
		$('#sum_continue_button').click(function () {
			$('#summary_frame').hide();
			$('#session_frame').hide();
			gameController.updateLevel();
		});
		$('#sum_continue_button').keydown(function (event) {
			var code = event.keyCode;
			if (code === cfg.UP_KEY || code === cfg.DOWN_KEY) {
				$(this).blur();
				$('#quit_button').focus();
			}
		});
		$('#quit_button').click(function () {
			$('#summary_frame').hide();
			Games.Common.processFinalScore();
			Games.Common.removeLivesDisplay();
			$('#score_display_frame').show();
		});
		$('#quit_button').keydown(function (event) {
			var code = event.keyCode;
			if (code === cfg.UP_KEY || code === cfg.DOWN_KEY) {
				$('#sum_continue_button').focus();
			}
		});
		$('#main_menu_button').click(function () {
			$('#score_display_frame').hide();
			$('#main_menu_button').hide();
			gameController.init();
			$('#menu_frame').show();
			$('#play_button').focus();
		});
		$('button').hover(function () {
			$(this).css({opacity: 1.0});
			},
			function () {
				$(this).css({opacity: 0.90});
				}
		);
	}
});
