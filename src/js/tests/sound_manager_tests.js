/* 
	Flash Intervals
	Tests for Creating random intervals */

/* constructor */
Flash.Interval.IntervalTests = function () {
	this.baseNoteProps;
	this.noteSpec;
	this.intervalProps;
	this.intervalNoteSpec;
	this.clef_type = "treble";
	this.level = 20;
	this.max_iter = 350;

}

Flash.Interval.IntervalTests.prototype.runTests = function () {
	var i, size, quality, swap,
		i, len;
	for (i = 0; i < this.max_iter; i++) {
		swap = false
		this.baseNoteProps = statusModel.getBaseNoteProperties(this.level);
		this.noteSpec = this.baseNoteProps.key + "/" + this.baseNoteProps.octave;
		//this.noteSpec = "GB/4";
		this.intervalProps = statusModel.getRandomIntervalProperties(statusModel.getLevel());
		//this.intervalProps = Flash.Interval.intervalProperties(14);
		len = statusModel.temp_interval_props.length;
		quality = this.intervalProps.quality;
		size = this.intervalProps.size;
		//exceptions for diminished and augmented intervals
		if (this.noteSpec[1] === "B" && this.noteSpec[0] !== "E" && (size !== 4 && 
				size !== 5) && quality === "d") {
			this.intervalProps.quality = "m";
			this.intervalProps.label = "m" + size;
			altlabel = "d" + size;
			swap = true;
			//console.log("swapped d for m: " + swap);
			//console.log("quality: " + this.intervalProps.quality);
		}
		if (this.noteSpec[1] === "B" && this.noteSpec[0] === "F" && size === 4 && 
				quality === "d") {
			this.intervalProps.quality = "p";
			this.intervalProps.label = "P" + size;
			altlabel = "d" + size;
			swap = true;
			//console.log("swapped d for P: " + swap);
		}
		if ((this.noteSpec[0] !== "C" && this.noteSpec[0] !== "F") && 
				this.noteSpec[1] === "#" && (size !== 4 && size !== 5) && 
					quality === "A") {
			this.intervalProps.quality = "M";
			this.intervalProps.label = "M" + size;
			altlabel = "A" + size;
			swap = true;
			//console.log("swapped A for M: " + swap);
		}
		
		if (swap) {
			console.log("swap: " + swap);
			for (i = 0; i < len; i++) {
				if (i !== statusModel.value_code) {
					if (statusModel.temp_interval_props[i].label === this.intervalProps.label) {
						statusModel.temp_interval_props[i].label = altlabel;
					}
				}
			}
			for (i = 0; i < len; i++) {
				console.log("label: " + statusModel.temp_interval_props[i].label);
			}
		}
		
		this.intervalNoteSpec = statusModel.getIntervalNoteSpec(this.noteSpec, 
			this.intervalProps.size, this.intervalProps.quality, this.clef_type);
		
		console.log("quality: " + this.intervalProps.quality + ", size: " + size + ", base: " + 
			this.noteSpec + ", top: " + this.intervalNoteSpec);
	}
	
}
