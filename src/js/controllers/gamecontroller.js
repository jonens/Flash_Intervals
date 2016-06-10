/*
	Flash Key Signatures
	Methods to control the gameplay and properties of a Flash Key Signatures game,
	and to update the StatusModel */

/* constructor   */
Flash.Interval.GameController = function () {
	var is_max_level = false,
		label_mode;
	this.MAJOR = 0,
	this.MINOR = 1,
	this.BOTH = 2;
	this.SCALE = 1.3;
	this.SESSION_MAX = 12;
	this.session_count = 0;
	//this.stave;
	this.clef_type = "treble";
	//this.baseNoteProps;
	this.baseNoteSpec = "";
	//this.intervalProps;
	this.intervalNoteSpec = "";
	//this.intervalNoteProps;
	this.interval_mode = 0;
	this.noteDur = "w";
	this.timeSig = Vex.Flow.TIME4_4;
	this.startx = 115;
	this.timeOut = 10;
	//this.snd1;
	//this.snd2;
	this.init();
}

/* Initialize game variables to initial state */
Flash.Interval.GameController.prototype.init = function () {
	statusModel.setStart(false);
	statusModel.setIsTimeout(false);
	statusModel.setTimeInterval(this.timeOut);
	statusModel.setLevel(1);
	statusModel.setPoints(0);
	statusModel.setAttempts(0);
	statusModel.setScore(0);
	this.session_count = 0;
	$('.listen_box').hide();
	statusModel.setLives(statusModel.MAX_LIVES);
	this.startx = 115;
	this.stave = notationController.drawStaff("staff_paper", 10, 15, 250, this.SCALE);
	notationController.drawClef("staff_paper", this.stave, this.clef_type);
	statusModel.setClef(this.clef_type);
	Games.Common.displayScore();
	return this;
}

Flash.Interval.GameController.prototype.displayGame = function () {
	this.init();
	statusView.initLivesDisplay("game_lives", statusModel.MAX_LIVES);
	statusView.initHitDisplay("hit_light");
	$('#status_level_label').html("Level:");
	$('#status_level').html("1");
	Games.Common.displaySessionAlert(true, false, false);
}

Flash.Interval.GameController.prototype.startGame = function () {
	var start = statusModel.getStart(),
		offset = 0,
		note_specs,
		len,
		size,
		quality,
		nkey,
		swap = false,
		int_accidental;
	console.log("start: " + start);
	$('.listen_box').hide();
	if (!start){
		statusModel.setStart(true);
		statusModel.setPoints(0);
		statusModel.setAttempts(0);
		this.session_count = 0;
		this.baseNoteProps = statusModel.getBaseNoteProperties(statusModel.getLevel());
		this.baseNoteSpec = this.baseNoteProps.key + "/" + this.baseNoteProps.octave;
		this.intervalProps = statusModel.getRandomIntervalProperties(statusModel.getLevel());
		len = statusModel.temp_interval_props.length;
		size = this.intervalProps.size;
		quality = this.intervalProps.quality;

		//exceptions for diminished and augmented intervals
		if (this.baseNoteSpec[1] === "B" && this.baseNoteSpec[0] !== "E" && (size !== 4 &&
				size !== 5) && quality === "d") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		if (this.baseNoteSpec[1] === "B" && this.baseNoteSpec[0] === "F" && size === 4 &&
				quality === "d") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		if ((this.baseNoteSpec[0] !== "C" && this.baseNoteSpec[0] !== "F") &&
				this.baseNoteSpec[1] === "#" && (size !== 4 && size !== 5) &&
					quality === "A") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		if (this.baseNoteSpec[0] === "B" && this.baseNoteSpec[1] === "#" &&
				size === 5 && quality === "A") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		this.intervalNoteSpec = statusModel.getIntervalNoteSpec(this.baseNoteSpec,
			this.intervalProps.size, this.intervalProps.quality, this.clef_type);
		this.intervalNoteProps = Vex.Flow.keyProperties(this.intervalNoteSpec);
		note_specs = { 	0: {note_names: [this.baseNoteSpec, this.intervalNoteSpec],
							accidentals: [this.baseNoteProps.accidental,
								this.intervalNoteProps.accidental],
							note_dur: "w"},
						length: 1
					};
		this.displayButtonLabels();
		notationController.drawClef("staff_paper", this.stave, this.clef_type);
		notationController.hideNote("staff_paper", this.stave);
		notationController.drawNotes("staff_paper", this.stave, note_specs, this.timeSig, this.startx);
		this.interval_mode = 1;
		this.session_count += 1;
	}
	else{
		this.stopGame();
	}
}

Flash.Interval.GameController.prototype.displayButtonLabels = function () {
	var i, j, key,
		label,
		prop,
		label_array = [],
		color_class,
		props = statusModel.getTempIntervalProperties(),
		len = props.length;

	//scan props for redundant labels and replace if necessary
	for (i = 0; i < len - 1; i++) {
		for (j = i + 1; j < len; j++) {
			if (props[i].label === props[j].label) {
				if (props[i].target === false) {
					props[i] = statusModel.getAltIntervalProperties();
				}
				else {
					props[j] = statusModel.getAltIntervalProperties();
				}
			}
		}
	}

	//if in "sound" mode, scan for redundant half-step size (i.e., intervals
	// are the same sound -- ex. A4 === d5 and change
	if (this.interval_mode === 2) {
		for (i = 0; i < len - 1; i++) {
			for (j = i + 1; j < len; j++) {
				if (props[i].halfsteps === props[j].halfsteps) {
					if (props[i].target === false) {
						props[i] = statusModel.getAltSoundProperties();
					}
					else {
						props[j] = statusModel.getAltSoundProperties();
					}
				}
			}
		}
	}

	//sort the props by size
	for (j = 1; j < len; j++) {
		prop = props[j];
		i = j - 1;
		while (i >= 0 && props[i].rank > prop.rank) {
			props[i + 1] = props[i];
			i = i - 1;
		}
		props[i + 1] = prop;
	}


	for (i = 0; i < len; i++) {
		label = props[i].label;
		bg = props[i].bgcolor;
		id = "#" + $('div.input_box button')[i].id;
		$(id).html("" + label);
		$(id).css('background-color', bg);
		if (props[i].target === true) statusModel.value_code = i;
	}

}

Flash.Interval.GameController.prototype.continueGame = function (code) {
	var that = this,
		match,
		start = statusModel.getStart(),
		level = statusModel.getLevel(),
		size,
		quality,
		baseSpec,
		intSpec,
		baseAccidental,
		intAccidental,
		selector,
		baseSndName,
		intervalSndName,
		baseSndNameProps,
		intervalSndNameProps,
		b_octave,
		i_octave,
		baseIndex,
		intervalIndex,
		i, len;
	statusModel.setInputCode(parseInt(code));
	match = statusModel.getMatch();
	if (match) {
		statusView.updateHitDisplay(true);
		$('.listen_box').hide();
		this.session_count += 1;
		console.log("session_count: " + this.session_count + ", SESSION_MAX: " + this.SESSION_MAX);
		if (this.session_count > this.SESSION_MAX) {
			this.stopGame();
		}
	}
	else {
		statusView.updateHitDisplay(false);
		statusModel.decLives();
		lives = statusModel.getLives();
		console.log("lives: " + lives);
		statusView.updateLivesDisplay();
		if (lives <= 0) {
			console.log("call stopGame()");
			this.stopGame();
		}
	}
	if (start && match){
    /* Comment out interval_mode = 2 so that sound version never reached */
		//if (!isiPad) {
		//	this.interval_mode = (this.interval_mode % 3);
		//}
		//else {
			this.interval_mode = (this.interval_mode % 2);
		//}
		this.baseNoteProps = statusModel.getBaseNoteProperties(statusModel.getLevel());
		this.baseNoteSpec = this.baseNoteProps.key + "/" + this.baseNoteProps.octave;
		this.intervalProps = statusModel.getRandomIntervalProperties(statusModel.getLevel());
		len = statusModel.temp_interval_props.length;
		size = this.intervalProps.size;
		quality = this.intervalProps.quality;

		//exceptions for diminished and augmented intervals
		if (this.baseNoteSpec[1] === "B" && this.baseNoteSpec[0] !== "E" && (size !== 4 &&
				size !== 5) && quality === "d") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		if (this.baseNoteSpec[1] === "B" && this.baseNoteSpec[0] === "F" && size === 4 &&
				quality === "d") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		if ((this.baseNoteSpec[0] !== "C" && this.baseNoteSpec[0] !== "F") &&
				this.baseNoteSpec[1] === "#" && (size !== 4 && size !== 5) &&
					quality === "A") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		if (this.baseNoteSpec[0] === "B" && this.baseNoteSpec[1] === "#" &&
				size === 5 && quality === "A") {
			this.intervalProps = statusModel.getAltIntervalProperties();
		}
		this.intervalNoteSpec = statusModel.getIntervalNoteSpec(this.baseNoteSpec,
			this.intervalProps.size, this.intervalProps.quality, this.clef_type);
		this.intervalNoteProps = Vex.Flow.keyProperties(this.intervalNoteSpec);

		if (this.interval_mode === 0) {
			this.startx = 105;
			note_specs = { 	0: {note_names: [this.baseNoteSpec, this.intervalNoteSpec],
								accidentals: [this.baseNoteProps.accidental,
									this.intervalNoteProps.accidental],
								note_dur: "w"},
							length: 1
						};
		}
		else if (this.interval_mode === 1) {
			this.startx = 85;
			selector = Math.round(Math.random() * 1000) % 2;
			if (level >= statusModel.SWITCH_LEVEL && selector  === 1) {
				baseSpec = this.intervalNoteSpec;
				intSpec = this.baseNoteSpec;
				baseAccidental = this.intervalNoteProps.accidental;
				intAccidental = this.baseNoteProps.accidental;
			}
			else {
				baseSpec = this.baseNoteSpec;
				intSpec = this.intervalNoteSpec;
				baseAccidental = this.baseNoteProps.accidental;
				intAccidental = this.intervalNoteProps.accidental;
			}
			note_specs = { 	0: {note_names: [baseSpec],
								accidentals: [baseAccidental],
								note_dur: "h"},
							1: {note_names: [intSpec],
								accidentals: [intAccidental],
								note_dur: "h"},
							length: 2
						};
		}
		this.displayButtonLabels();
		notationController.drawClef("staff_paper", this.stave, this.clef_type);
		notationController.hideNote("staff_paper", this.stave);
		if (this.interval_mode !== 2) {
			notationController.drawNotes("staff_paper", this.stave, note_specs,
				this.timeSig, this.startx);
		}
		else {
			$('.listen_box').show();
			baseSndName = this.baseNoteProps.key;
			intervalSndName = this.intervalNoteProps.key;

			//convert the VexFlow names to the playable names
			baseSndNameProps = Flash.Interval.intervalSoundNameProperties(baseSndName);
			intervalSndNameProps = Flash.Interval.intervalSoundNameProperties(intervalSndName);

			//check for CB, CBB, and B#
			if (baseSndName === "CB" || baseSndName === "CBB") {
				b_octave = parseInt(this.baseNoteProps.octave) - 1;
			}
			else if (baseSndName === "B#" || baseSndName === "B##") {
				b_octave = parseInt(this.baseNoteProps.octave) + 1;
			}
			else {
				b_octave = parseInt(this.baseNoteProps.octave);
			}
			if (intervalSndName === "CB" || intervalSndName === "CBB") {
				i_octave = parseInt(this.intervalNoteProps.octave) - 1;
			}
			else if (intervalSndName === "B#" || intervalSndName === "B#") {
				i_octave = parseInt(this.intervalNoteProps.octave) + 1;
			}
			else {
				i_octave = parseInt(this.intervalNoteProps.octave);
			}
			baseIndex = b_octave + baseSndNameProps.offset;
			intervalIndex = i_octave + intervalSndNameProps.offset;

			selector = Math.round(Math.random() * 1000) % 2;
			if (level >= statusModel.SWITCH_LEVEL && selector  === 1) {
				this.snd1 = Flash.Interval.intervalSounds.table.sounds[intervalIndex].sound;
				this.snd2 = Flash.Interval.intervalSounds.table.sounds[baseIndex].sound;
			}
			else {
				this.snd1 = Flash.Interval.intervalSounds.table.sounds[baseIndex].sound;
				this.snd2 = Flash.Interval.intervalSounds.table.sounds[intervalIndex].sound;
			}
			soundManager.play(this.snd1.id, {
				onfinish: function() {
					//that.snd2.play();
					soundManager.play(that.snd2.id);
				}
			});
		}
		statusModel.addPoint();
		statusModel.calculateScore();
		this.interval_mode += 1;
	}
	if (start){
		statusModel.addAttempt();
		Games.Common.displayScore();
	}
}

Flash.Interval.GameController.prototype.stopGame = function () {
	var next_level, level, game_over;
	next_level = statusModel.isLevelAdvance();
	game_over = (statusModel.getLives() > 0) ? false : true;
	if (next_level){
		statusModel.advanceLevel();
		statusModel.addBonus();
		statusModel.setStart(false);
	}
	if (this.session_count >= this.SESSION_MAX || game_over) {
		Games.Common.displaySessionAlert(false, game_over, next_level);
	}
	return this;
}

/* Call this function only after a timeout (not after user presses stop button) */
Flash.Interval.GameController.prototype.resetGame = function () {
	statusModel.setIsTimeout(false);
	statusModel.setTimeInterval(this.timeOut);
	statusModel.setPoints(0);
	statusModel.setAttempts(0);
	this.clef_type = "treble";
	Games.Common.displayScore();
}

Flash.Interval.GameController.prototype.getStart = function() {
	return statusModel.getStart();
}

/* Use this method to update the game to the next level when in GAME mode,
	ONLY after stopGame() */
Flash.Interval.GameController.prototype.updateLevel = function () {
	var level = statusModel.getLevel();
	this.clef_type = ((level % 2) === 1) ? "treble" : "bass" ;
	statusModel.setClef(this.clef_type);
	Games.Common.displayScore();
	statusModel.setStart(false);
	Games.Common.displaySessionAlert(true, false, false);
}
