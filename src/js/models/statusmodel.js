/*
	Flash Intervals
	Provides basic control functions for games */

/* constructor */
Flash.Interval.StatusModel = function() {
	this.MAX_LEVEL = 30;
	this.MIN_ATTEMPTS = 12;
	this.MIN_PERCENT = 80;
	this.BONUS = 5;
	this.BONUS_INC = 5;
	this.BONUS_LEVEL = 0;
	this.MAX_LIVES = 5;
	this.SWITCH_LEVEL = 8;
	//this.time;
	//this.date;
	//this.date_time;
	this.points = 0;
	this.attempts = 0;
	this.score = 0;
	this.level = 1;
	this.bonus = 0;
	this.lives = 5;
	this.start = false;
	this.timeInterval = this.TIMEOUT;
	this.isTimeOut = false;
	//this.old_score;
	//this.hi_score;
	this.input_code = 0;
	this.value_code = 0;
	this.clef = "treble";

	//per level 1 - 30
	this.base_notes = ["C", "F", "G", "D", "E", "A", "B", "BB", "EB", "DB", "GB",
					"F#", "AB", "C#", "CB", "FB", "G#", "D#", "E#", "A#", "B#"];
	//max (bound) for index for each level
	//i.e., index < bound
	this.base_note_bounds = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
							 18, 19, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21];
	//max (bound) for intervalProperties indices from interval_tables.js , per level 1-10
	//i.e., index < bound
	this.interval_bounds = [4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
							18, 19, 20, 21, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23];
	//interval order ==> by level: M2, P5, M3, P4, m3, P8, M6, M7, m6, m7, m2, d2,
	// 							   A2, d3, A3, d4, A4, d5, A5, d6, A6, d7, A7
	this.interval_index = [2, 12, 6, 9, 5, 22, 16, 20, 15, 19, 1, 0, 3, 4, 7, 8,
		10, 11, 13, 14, 17, 18, 21];

	this.temp_interval_props = [];
	//this.alt_props;
	//this.alt_sound_props;
	//this.reserve_props;
	//this.base_note;
	this.top_scores = [];
	this.top_times = [];
	this.top_date_strings = [];
	this.top_time_strings = [];

	if (Modernizr.localstorage){
		this.old_score = parseInt(localStorage.getItem("hiscore_interval"));
		this.hi_score = (this.old_score) ? this.old_score : 0;
	}
	else {
		this.hi_score = 0;
	}
}

Flash.Interval.StatusModel.prototype.getTime = function () {
	return this.time;
}
Flash.Interval.StatusModel.prototype.setTime = function (t) {
	this.time = t;
}
Flash.Interval.StatusModel.prototype.setDate = function () {
	this.date = new Date();
	this.date_time = this.date.getTime();
}
Flash.Interval.StatusModel.prototype.getDateTime = function () {
	return this.date_time;
}
Flash.Interval.StatusModel.prototype.getDateString = function () {
	var month = "" + (this.date.getMonth() + 1);
	var day = (this.date.getDate() < 10) ? "0" + this.date.getDate() : this.date.getDate();
	return month + "-" + day + "-" + this.date.getFullYear();
}
Flash.Interval.StatusModel.prototype.getTimeString = function () {
	var hour = "" + this.date.getHours();
	var minute = (this.date.getMinutes() < 10) ? "0" + this.date.getMinutes() : this.date.getMinutes();
	var second = (this.date.getSeconds() < 10) ? "0" + this.date.getSeconds() : this.date.getSeconds();
	return hour + ":" + minute + ":" + second;
}
Flash.Interval.StatusModel.prototype.addPoint = function () {
	this.points += 1;
}
Flash.Interval.StatusModel.prototype.setPoints = function (num) {
	this.points = num;
}
Flash.Interval.StatusModel.prototype.getPoints = function () {
	return this.points;
}
Flash.Interval.StatusModel.prototype.addAttempt = function () {
	this.attempts += 1;
}
Flash.Interval.StatusModel.prototype.setAttempts = function (num) {
	this.attempts = num;
}
Flash.Interval.StatusModel.prototype.getAttempts = function () {
	return this.attempts;
}
Flash.Interval.StatusModel.prototype.getPercent = function () {
	return Math.floor((this.points / this.attempts) * 100);
}
Flash.Interval.StatusModel.prototype.calculateScore = function() {
	this.score += (this.points * this.level);
}
Flash.Interval.StatusModel.prototype.addBonus = function () {
	this.bonus = this.BONUS * this.level;
	this.score += this.bonus;
}
Flash.Interval.StatusModel.prototype.getBonus = function (){
	return this.bonus;
}
Flash.Interval.StatusModel.prototype.setScore = function (num) {
	this.score = num;
}
Flash.Interval.StatusModel.prototype.getScore = function () {
	return this.score;
}
Flash.Interval.StatusModel.prototype.getHiScore = function () {
	return this.hi_score;
}
Flash.Interval.StatusModel.prototype.setHiScore = function (num) {
	this.hi_score = num;
	if (Modernizr.localstorage){
		localStorage.setItem("hiscore_interval", this.hi_score);
	}
}
Flash.Interval.StatusModel.prototype.setLevel = function (lvl) {
	this.level = lvl;
	if (this.level > this.BONUS_LEVEL) {
		this.BONUS += this.BONUS_INC;
	}
}
Flash.Interval.StatusModel.prototype.getLevel = function () {
	return this.level;
}
Flash.Interval.StatusModel.prototype.advanceLevel = function () {
	this.setLevel((this.level < this.MAX_LEVEL) ? this.level += 1 : this.MAX_LEVEL);
	return this;
}
Flash.Interval.StatusModel.prototype.decLives = function () {
	this.lives -= 1;
	if (this.lives < 0){
		this.lives = 0;
	}
}
Flash.Interval.StatusModel.prototype.setLives = function (num) {
	this.lives = num;
}
Flash.Interval.StatusModel.prototype.getLives = function () {
	return this.lives;
}

Flash.Interval.StatusModel.prototype.setStart = function (start) {
	this.start = start;
}
Flash.Interval.StatusModel.prototype.getStart = function () {
	return this.start;
}
Flash.Interval.StatusModel.prototype.setTimeInterval = function (num) {
	this.timeInterval = num;
}
Flash.Interval.StatusModel.prototype.getTimeInterval = function () {
	return this.timeInterval;
}
/* Set a boolean indicating timeOut */
Flash.Interval.StatusModel.prototype.setIsTimeout = function (to){
	this.isTimeOut = to;
}
/* Get boolean indicating timeOut */
Flash.Interval.StatusModel.prototype.getIsTimeout = function () {
	return this.isTimeOut;
}

/* Returns the spec for a randomly-chosen base note */
Flash.Interval.StatusModel.prototype.getBaseNoteProperties = function (level) {
	var shuffled_notes = [],
		i, j,
		max_note_index = this.base_note_bounds[level - 1],
		note_index,
		note_spec,
		octave = Math.round((Math.random() * 1000) % 4) + 2,
		note_props;

	//shuffle the note indices (Fisher�Yates shuffle, inside-out)
	shuffled_notes[0] = this.base_notes[0];
	for (i = 1; i < max_note_index; i++) {
		j = Math.round(Math.random() * 1000) % (i + 1);
		shuffled_notes[i] = shuffled_notes[j];
		shuffled_notes[j] = this.base_notes[i];
	}
	this.base_note = shuffled_notes[0];
	note_index = Vex.Flow.keyProperties.note_values[this.base_note].index;
	switch (this.clef) {
		case "treble":
			//lowest possible base note is B/3
			if (octave < 4) {
				if (note_index < 6) {
					octave = 4;
				}
				else {
					octave = 3;
				}
			}
			if (level < 4) {
				//highest posasible base note is E/5
				if (octave > 4) {
					if (note_index > 2) {
						octave = 4;
					}
					else octave = 5;
				}
			}
			else {
				//highest possible base note is B/4
				if (octave > 4) {
					octave = 4;
				}
			}
			break;
		case "bass":
			//lowest possible base note is D/2
			if (octave < 3 && note_index < 1) octave = 3;
			if (level < 4) {
				//highest possible base note is G/3
				if (octave > 2) {
					if (note_index > 4) {
						octave = 2;
					}
					else octave = 3;
				}
			}
			else {
				//highest possible base note is D/3
				if (octave > 2) {
					if (note_index > 1) {
						octave = 2;
					}
					else octave = 3;
				}
			}
			break;
	}
	note_spec = this.base_note + "/" + octave;
	note_props = Vex.Flow.keyProperties(note_spec, this.clef);
	return note_props;
}

Flash.Interval.StatusModel.prototype.getRandomIntervalProperties = function (level) {
	var max = this.interval_bounds[level - 1],
		index,
		props,
		interval_props = [],
		shuffled_interval_props = [],
		i, j,
		len;
	//create a pool of all intervals available for this level.
	for (i = 0; i < max; i++) {
		index = this.interval_index[i];
		interval_props[i] = Flash.Interval.intervalProperties(index);
		interval_props[i].target = false;
	}
	//shuffle the interval_props (Fisher�Yates shuffle, inside-out)
	shuffled_interval_props[0] = interval_props[0];
	for (i = 1; i < max; i++) {
		j = Math.round(Math.random() * 1000) % (i + 1);
		shuffled_interval_props[i] = shuffled_interval_props[j];
		shuffled_interval_props[j] = interval_props[i];
	}
	len = (shuffled_interval_props.length < 3) ? shuffled_interval_props.length : 3;
	for (i = 0; i < len; i++) {
		this.temp_interval_props[i] = shuffled_interval_props[i];
	}
	this.alt_props = shuffled_interval_props[3];
	this.alt_sound_props = (this.level >= 3) ? shuffled_interval_props[4] : null;
	this.reserve_props = (this.level >= 4) ? shuffled_interval_props[5] : null;
	index = Math.round(Math.random() * 100) % len;
	props = shuffled_interval_props[index];
	this.value_code = index;
	props.target = true;
	return props;
}

Flash.Interval.StatusModel.prototype.getTempIntervalProperties = function () {
	return this.temp_interval_props;
}

Flash.Interval.StatusModel.prototype.getAltIntervalProperties = function () {
	//if this is being swapped out, it needs to be the target, inserted into the
	//temp_interval_props, and the corresdponding properties swapped out of
	var new_props = this.alt_props;
	new_props.target = true;
	this.temp_interval_props[this.value_code] = new_props;
	this.alt_props = this.reserve_props;
	return new_props;
}

Flash.Interval.StatusModel.prototype.getAltSoundProperties = function () {
	return this.alt_sound_props;
}

/* Returns the spec for a note precisely at the interval above the given base note */
Flash.Interval.StatusModel.prototype.getIntervalNoteSpec = function (base, size, quality, clef) {
	var base_note = Vex.Flow.keyProperties(base).key,
		base_octave = parseInt(Vex.Flow.keyProperties(base).octave),
		base_index = Vex.Flow.keyProperties.note_values[base_note].index,
		base_accidental = Vex.Flow.keyProperties.note_values[base_note].accidental,
		note_spec = "",
		type,
		//note_index is 0-based, size is 1-based - so subtract one when getting the interval_index
		interval_octave = ((base_index + size - 1) < 7) ? base_octave : (base_octave + 1),
		interval_index = (base_index + size - 1) % 7,
		interval_accidental = "";

	type = (size !== 4 && size !== 5) ? "m" : "p";
	if (size === 8) {
		interval_accidental = base_accidental;
	}
	else {
		interval_accidental = Flash.Interval.accidental(base_note, size, quality);
	}
	interval_accidental = (interval_accidental) ? interval_accidental : "";
	note_spec = Vex.Flow.integerToNoteLetter(interval_index) + interval_accidental.toUpperCase()
		+ "/" + interval_octave;

	return note_spec;

}

Flash.Interval.StatusModel.prototype.setInputCode = function (code) {
	this.input_code = code;
}

Flash.Interval.StatusModel.prototype.getMatch = function () {
	return (this.input_code === this.value_code);
}

/** @return true if level advances, false otherwise */
Flash.Interval.StatusModel.prototype.isLevelAdvance = function () {
	//var advance = ((this.getPercent() >= this.MIN_PERCENT) && (this.getIsTimeout()) &&
	//			(this.getAttempts() >= this.MIN_ATTEMPTS)) ? true : false;
	var advance = ((this.getPercent() >= this.MIN_PERCENT) &&
				(this.getAttempts() >= this.MIN_ATTEMPTS - 1)) ? true : false;
	return advance;
}

Flash.Interval.StatusModel.prototype.setClef = function (clef) {
	this.clef = clef;
	return this;
}

Flash.Interval.StatusModel.prototype.getClef = function (clef) {
	return this.clef = clef;
}
