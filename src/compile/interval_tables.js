/* 
	FlashNotes Keyboard Tables
	Provide conversions for various entities in game logic */

/* Clef is a number from the config file --> a clef
	Index is a range index (smaller the index, smaller the range) */
Flash.Interval.intervalProperties = function(index) {
	var props = Flash.Interval.intervalProperties.table[index];
	return props;
}

/* Arrays progress from min to max -- smallest to widest range
	in VexFlow, these values map to the letter names only (not accidentals)*/
Flash.Interval.intervalProperties.table = {
	0: {
		size: 2,
		quality: "d",
		label: "d2",
		halfsteps: 0,
		bgcolor: "#F6F9ED", //frosted lime
		target: false,
		rank: 0
	},
	1: {
		size: 2,
		quality: "m",
		label: "m2",
		halfsteps: 1,
		bgcolor: "#ECF1EF", //far horizon
		target: false,
		rank: 1
	},
	2: {
		size: 2,
		quality: "M",
		label: "M2",
		halfsteps: 2,
		bgcolor: "#FCF6CF", //warm summer
		target: false,
		rank: 2
	},
	3: {
		size: 2,
		quality: "A",
		label: "A2",
		halfsteps: 3,
		bgcolor: "#FEEECD", //Dusted Pink
		target: false,
		rank: 3
	},
	4: {
		size: 3,
		quality: "d",
		label: "d3",
		halfsteps: 2,
		bgcolor: "#FEF1E9", //Ostrich Feather
		target: false,
		rank: 4
	},
	5: {
		size: 3,
		quality: "m",
		label: "m3",
		halfsteps: 3,
		bgcolor: "#76EEC6", //aquamarine2
		target: false,
		rank: 5
	},
	6: {
		size: 3,
		quality: "M",
		label: "M3",
		halfsteps: 4,
		bgcolor: "#E0EEEE", //azure2
		target: false,
		rank: 6
	},
	7: {
		size: 3,
		quality: "A",
		label: "A3",
		halfsteps: 5,
		bgcolor: "#FFE4C4", //bisque1
		target: false,
		rank: 7
	},
	8: {
		size: 4,
		quality: "d",
		label: "d4",
		halfsteps: 4,
		bgcolor: "#FFD39B", //burlywood1
		target: false,
		rank: 8
	},
	9: {
		size: 4,
		quality: "p",
		label: "P4",
		halfsteps: 5,
		bgcolor: "#8EE5EE", //cadetblue2
		target: false,
		rank: 9
	},
	10: {
		size: 4,
		quality: "A",
		label: "A4",
		halfsteps: 6,
		bgcolor: "#EEE8CD", //cornsilk2
		target: false,
		rank: 10
	},
	11: {
		size: 5,
		quality: "d",
		label: "d5",
		halfsteps: 6,
		bgcolor: "#FFB90F", //darkgoldenrod1
		target: false,
		rank: 11
	},
	12: {
		size: 5,
		quality: "p",
		label: "P5",
		halfsteps: 7,
		bgcolor: "#BDB76B", //darkkhaki
		target: false,
		rank: 12
	},
	13: {
		size: 5,
		quality: "A",
		label: "A5",
		halfsteps: 8,
		bgcolor: "#A2CD5A", //darkolivegreen3
		target: false,
		rank: 13
	},
	14: {
		size: 6,
		quality: "d",
		label: "d6",
		halfsteps: 7,
		bgcolor: "#E9967A", //darksalmon
		target: false,
		rank: 14
	},
	15: {
		size: 6,
		quality: "m",
		label: "m6",
		halfsteps: 8,
		bgcolor: "#8DEEEE", //darkslategray2
		target: false,
		rank: 15
	},
	16: {
		size: 6,
		quality: "M",
		label: "M6",
		halfsteps: 9,
		bgcolor: "#00BFFF", //deepskyblue
		target: false,
		rank: 16
	},
	17: {
		size: 6,
		quality: "A",
		label: "A6",
		halfsteps: 10,
		bgcolor: "#EEC900", //gold2
		target: false,
		rank: 17
	},
	18: {
		size: 7,
		quality: "d",
		label: "d7",
		halfsteps: 9,
		bgcolor: "#F0FFF0", //honeydew
		target: false,
		rank: 18
	},
	19: {
		size: 7,
		quality: "m",
		label: "m7",
		halfsteps: 10,
		bgcolor: "#FFFFF0", //ivory1
		target: false,
		rank: 19
	},
	20: {
		size: 7,
		quality: "M",
		label: "M7",
		halfsteps: 11,
		bgcolor: "#FFF68F", //khaki1
		target: false,
		rank: 20
	},
	21: {
		size: 7,
		quality: "A",
		label: "A7",
		halfsteps: 12,
		bgcolor: "#CAE1FF", //lightsteelblue1
		target: false,
		rank: 21
	},
	22: {
		size: 8,
		quality: "p",
		label: "P8",
		halfsteps: 12,
		bgcolor: "#FFE4E1",//mistyrose
		target: false,
		rank: 22
	}	
}

Flash.Interval.baseNote = function (index) {
	base_notes = ["C", "F", "G", "D", "E", "A", "B", "C#", "CB", "DB", "EB", 
					"F#", "GB", "AB", "BB"];

	return base_notes[index];
}

/**
	@param String base_spec The spec of the interval base_note: "C", C#", etc.
	@param Number size The size of the interval
	@param String quality The quality of the interval = "d", "m", "M", "P", "A"
*/
Flash.Interval.accidental = function (base_spec, size, quality) {
	var interval_props = Flash.Interval.acc_table[base_spec];
	var accidentals = interval_props[size];
	var accidental = accidentals[quality];
	return accidental;
}

Flash.Interval.acc_table = {
	"CBB": {
		2: {"d": "", "m": "", "M": "bb", "A": "b"},
		3: {"d": "", "m": "", "M": "b", "A": "b"},
		4: {"d": "", "p": "bb", "A": "b"},
		5: {"d": "", "p": "bb", "A": "b"},
		6: {"d": "", "m": "", "M": "bb", "A": "b"},
		7: {"d": "", "m": "", "M": "bb", "A": "b"}
	},
	"CB": {
		2: {"d": "", "m": "bb", "M": "b", "A": ""},
		3: {"d": "", "m": "bb", "M": "b", "A": ""},
		4: {"d": "bb", "p": "b", "A": ""},
		5: {"d": "bb", "p": "b", "A": ""},
		6: {"d": "", "m": "bb", "M": "b", "A": ""},
		7: {"d": "", "m": "bb", "M": "b", "A": ""}
	},
	"C": {
		2: {"d": "bb", "m": "b", "M": "", "A": "#"},
		3: {"d": "bb", "m": "b", "M": "", "A": "#"},
		4: {"d": "b", "p": "", "A": "#"},
		5: {"d": "b", "p": "", "A": "#"},
		6: {"d": "bb", "m": "b", "M": "", "A": "#"},
		7: {"d": "bb", "m": "b", "M": "", "A": "#"}
	},
	"C#": {
		2: {"d": "b", "m": "", "M": "#", "A": "##"},
		3: {"d": "b", "m": "", "M": "#", "A": "##"},
		4: {"d": "", "p": "#", "A": "##"},
		5: {"d": "", "p": "#", "A": "##"},
		6: {"d": "b", "m": "", "M": "#", "A": "##"},
		7: {"d": "b", "m": "", "M": "#", "A": "##"}
	},
	"C##": {
		2: {"d": "", "m": "#", "M": "##", "A": ""},
		3: {"d": "", "m": "#", "M": "##", "A": ""},
		4: {"d": "#", "p": "##", "A": ""},
		5: {"d": "#", "p": "##", "A": ""},
		6: {"d": "", "m": "#", "M": "##", "A": ""},
		7: {"d": "", "m": "#", "M": "##", "A": ""}
	},
	"DBB": {
		2: {"d": "", "m": "", "M": "bb", "A": "b"},
		3: {"d": "", "m": "bb", "M": "b", "A": ""},
		4: {"d": "", "p": "bb", "A": "b"},
		5: {"d": "", "p": "bb", "A": "b"},
		6: {"d": "", "m": "", "M": "bb", "A": "b"},
		7: {"d": "", "m": "bb", "M": "b", "A": ""}
	},
	"DB": {
		2: {"d": "", "m": "bb", "M": "b", "A": ""},
		3: {"d": "bb", "m": "b", "M": "", "A": "#"},
		4: {"d": "bb", "p": "b", "A": ""},
		5: {"d": "bb", "p": "b", "A": ""},
		6: {"d": "", "m": "bb", "M": "b", "A": ""},
		7: {"d": "bb", "m": "b", "M": "", "A": "#"}
	},
	"D": {
		2: {"d": "bb", "m": "b", "M": "", "A": "#"},
		3: {"d": "b", "m": "", "M": "#", "A": "##"},
		4: {"d": "b", "p": "", "A": "#"},
		5: {"d": "b", "p": "", "A": "#"},
		6: {"d": "bb", "m": "b", "M": "", "A": "#"},
		7: {"d": "b", "m": "", "M": "#", "A": "##"}
	},
	"D#": {
		2: {"d": "b", "m": "", "M": "#", "A": "##"},
		3: {"d": "", "m": "#", "M": "##", "A": ""},
		4: {"d": "", "p": "#", "A": "##"},
		5: {"d": "", "p": "#", "A": "##"},
		6: {"d": "b", "m": "", "M": "#", "A": "##"},
		7: {"d": "", "m": "#", "M": "##", "A": ""}
	},
	"D##": {
		2: {"d": "", "m": "#", "M": "##", "A": ""},
		3: {"d": "#", "m": "##", "M": "", "A": ""},
		4: {"d": "#", "p": "##", "A": ""},
		5: {"d": "#", "p": "##", "A": ""},
		6: {"d": "", "m": "#", "M": "##", "A": ""},
		7: {"d": "#", "m": "##", "M": "", "A": ""}
	},
	"EBB": {
		2: {"d": "", "m": "bb", "M": "b", "A": ""},
		3: {"d": "", "m": "bb", "M": "b", "A": ""},
		4: {"d": "", "p": "bb", "A": "b"},
		5: {"d": "", "p": "bb", "A": "b"},
		6: {"d": "", "m": "bb", "M": "b", "A": ""},
		7: {"d": "", "m": "bb", "M": "b", "A": ""}
	},
	"EB": {
		2: {"d": "bb", "m": "b", "M": "", "A": "#"},
		3: {"d": "bb", "m": "b", "M": "", "A": "#"},
		4: {"d": "bb", "p": "b", "A": ""},
		5: {"d": "bb", "p": "b", "A": ""},
		6: {"d": "bb", "m": "b", "M": "", "A": "#"},
		7: {"d": "bb", "m": "b", "M": "", "A": "#"}
	},
	"E": {
		2: {"d": "b", "m": "", "M": "#", "A": "##"},
		3: {"d": "b", "m": "", "M": "#", "A": "##"},
		4: {"d": "b", "p": "", "A": "#"},
		5: {"d": "b", "p": "", "A": "#"},
		6: {"d": "b", "m": "", "M": "#", "A": "##"},
		7: {"d": "b", "m": "", "M": "#", "A": "##"}
	},
	"E#": {
		2: {"d": "", "m": "#", "M": "##", "A": ""},
		3: {"d": "", "m": "#", "M": "##", "A": ""},
		4: {"d": "", "p": "#", "A": "##"},
		5: {"d": "", "p": "#", "A": "##"},
		6: {"d": "", "m": "#", "M": "##", "A": ""},
		7: {"d": "", "m": "#", "M": "##", "A": ""}
	},
	"E##": {
		2: {"d": "#", "m": "##", "M": "", "A": ""},
		3: {"d": "#", "m": "##", "M": "", "A": ""},
		4: {"d": "#", "p": "##", "A": ""},
		5: {"d": "#", "p": "##", "A": ""},
		6: {"d": "#", "m": "##", "M": "", "A": ""},
		7: {"d": "#", "m": "##", "M": "", "A": ""}
	},
	//"FBB":
	"FB": {
		2: {"d": "", "m": "bb", "M": "b", "A": ""},
		3: {"d": "", "m": "bb", "M": "b", "A": ""},
		4: {"d": "", "p": "bb", "A": "b"},
		5: {"d": "bb", "p": "b", "A": ""},
		6: {"d": "", "m": "bb", "M": "b", "A": ""},
		7: {"d": "", "m": "bb", "M": "b", "A": ""}
	},
	"F": {
		2: {"d": "bb", "m": "b", "M": "", "A": "#"},
		3: {"d": "bb", "m": "b", "M": "", "A": "#"},
		4: {"d": "bb", "p": "b", "A": ""},
		5: {"d": "b", "p": "", "A": "#"},
		6: {"d": "bb", "m": "b", "M": "", "A": "#"},
		7: {"d": "bb", "m": "b", "M": "", "A": "#"}
	},
	"F#": {
		2: {"d": "b", "m": "", "M": "#", "A": "##"},
		3: {"d": "b", "m": "", "M": "#", "A": "##"},
		4: {"d": "b", "p": "", "A": "#"},
		5: {"d": "", "p": "#", "A": "##"},
		6: {"d": "b", "m": "", "M": "#", "A": "##"},
		7: {"d": "b", "m": "", "M": "#", "A": "##"}
	},
	//"F##":
	//"GBB":
	"GB": {
		2: {"d": "", "m": "bb", "M": "b", "A": ""},
		3: {"d": "", "m": "bb", "M": "b", "A": ""},
		4: {"d": "bb", "p": "b", "A": ""},
		5: {"d": "bb", "p": "b", "A": ""},
		6: {"d": "", "m": "bb", "M": "b", "A": ""},
		7: {"d": "bb", "m": "b", "M": "", "A": "#"}
	},
	"G": {
		2: {"d": "bb", "m": "b", "M": "", "A": "#"},
		3: {"d": "bb", "m": "b", "M": "", "A": "#"},
		4: {"d": "b", "p": "", "A": "#"},
		5: {"d": "b", "p": "", "A": "#"},
		6: {"d": "bb", "m": "b", "M": "", "A": "#"},
		7: {"d": "b", "m": "", "M": "#", "A": "##"}
	},
	"G#": {
		2: {"d": "b", "m": "", "M": "#", "A": "##"},
		3: {"d": "b", "m": "", "M": "#", "A": "##"},
		4: {"d": "", "p": "#", "A": "##"},
		5: {"d": "", "p": "#", "A": "##"},
		6: {"d": "b", "m": "", "M": "#", "A": "##"},
		7: {"d": "", "m": "#", "M": "##", "A": ""}
	},
	//"G##":
	//"ABB":
	"AB": {
		2: {"d": "", "m": "bb", "M": "b", "A": ""},
		3: {"d": "bb", "m": "b", "M": "", "A": "#"},
		4: {"d": "bb", "p": "b", "A": ""},
		5: {"d": "bb", "p": "b", "A": ""},
		6: {"d": "bb", "m": "b", "M": "", "A": "#"},
		7: {"d": "bb", "m": "b", "M": "", "A": "#"}
	},
	"A": {
		2: {"d": "bb", "m": "b", "M": "", "A": "#"},
		3: {"d": "b", "m": "", "M": "#", "A": "##"},
		4: {"d": "b", "p": "", "A": "#"},
		5: {"d": "b", "p": "", "A": "#"},
		6: {"d": "b", "m": "", "M": "#", "A": "##"},
		7: {"d": "b", "m": "", "M": "#", "A": "##"}
	},
	"A#": {
		2: {"d": "b", "m": "", "M": "#", "A": "##"},
		3: {"d": "", "m": "#", "M": "##", "A": ""},
		4: {"d": "", "p": "#", "A": "##"},
		5: {"d": "", "p": "#", "A": "##"},
		6: {"d": "", "m": "#", "M": "##", "A": ""},
		7: {"d": "", "m": "#", "M": "##", "A": ""}
	},
	//"A##":
	//"BBB":
	"BB": {
		2: {"d": "bb", "m": "b", "M": "", "A": "#"},
		3: {"d": "bb", "m": "b", "M": "", "A": "#"},
		4: {"d": "bb", "p": "b", "A": ""},
		5: {"d": "b", "p": "", "A": "#"},
		6: {"d": "bb", "m": "b", "M": "", "A": "#"},
		7: {"d": "bb", "m": "b", "M": "", "A": "#"}
	},
	"B": {
		2: {"d": "b", "m": "", "M": "#", "A": "##"},
		3: {"d": "b", "m": "", "M": "#", "A": "##"},
		4: {"d": "b", "p": "", "A": "#"},
		5: {"d": "", "p": "#", "A": "##"},
		6: {"d": "b", "m": "", "M": "#", "A": "##"},
		7: {"d": "b", "m": "", "M": "#", "A": "##"}
	},
	"B#": {
		2: {"d": "", "m": "#", "M": "##", "A": ""},
		3: {"d": "", "m": "#", "M": "##", "A": ""},
		4: {"d": "", "p": "#", "A": "##"},
		5: {"d": "#", "p": "##", "A": ""},
		6: {"d": "", "m": "#", "M": "##", "A": ""},
		7: {"d": "", "m": "#", "M": "##", "A": ""}
	}
	//"B##":
}

Flash.Interval.intervalSoundNameProperties = function(name) {
	var index,
		soundNameProps;
	switch (name) {
		case "C":
		case "DBB":
		case "B#":
			index = 0;
			break;
		case "D":
		case "EBB":
		case "C##":
			index = 1;
			break;
		case "E":
		case "FB":
		case "D##":
			index = 2;
			break;
		case "F":
		case "GBB":
		case "E#":
			index = 3;
			break;
		case "G":
		case "ABB":
		case "F##":
			index = 4;
			break;
		case "A":
		case "BBB":
		case "G##":
			index = 5;
			break;
		case "B":
		case "CB":
		case "A##":
			index = 6;
			break;
		case "C#":
		case "DB":
		case "B##":
			index = 7;
			break;
		case "D#":
		case "EB":
		case "FBB":
			index = 8;
			break;
		case "F#":
		case "GB":
		case "E##":
			index = 9;
			break;
		case "G#":
		case "AB":
			index = 10;
			break;
		case "A#":
		case "BB":
		case "CBB":
			index = 11;
			break;
	}
	soundNameProps = Flash.Interval.intervalSoundNameProperties.table.names[index];
	return soundNameProps;
}

//translation table for corresponding mp3 note names
//order by primary names first, redundant names last
//offset is the amount to add to the octave (added in code) to get the index into
//the Flash.Interval.intervalSounds.table;  
// Ex.  "C" offset is -2; C2 octave = 2; 2 + (-2) = 0 = index for C2;
// Ex.  "Ds" offset is 11; Ds2 octave = 2; 2 + 11 = 13 = index for Ds2;
Flash.Interval.intervalSoundNameProperties.table = {
	names: {
		0: {name: "C", offset: -2},
		1: {name: "D", offset: 7},
		2: {name: "E", offset: 15},
		3: {name: "F", offset: 19},
		4: {name: "G", offset: 27},
		5: {name: "A", offset: 35},
		6: {name: "B", offset: 43},
		7: {name: "Cs", offset: 3},
		8: {name: "Ds", offset: 11},
		9: {name: "Fs", offset: 23},
		10: {name: "Gs", offset: 31},
		11: {name: "As", offset: 39}
	},
	length: 12
}

Flash.Interval.intervalSounds = function() {
	var props = [];
	for (var i = 0; i < Flash.Interval.intervalSounds.table.length; i++) {
		props[i] = Flash.Interval.intervalSounds.table[i];
	}
	return props;
}

//stores properties (sound objects) for loading and playing actual sounds
Flash.Interval.intervalSounds.table = {
	sounds: {
		0: {name: "C2", sound: null},
		1: {name: "C3", sound: null},
		2: {name: "C4", sound: null},
		3: {name: "C5", sound: null},
		4: {name: "C6", sound: null},
		5: {name: "Cs2", sound: null},
		6: {name: "Cs3", sound: null},
		7: {name: "Cs4", sound: null},
		8: {name: "Cs5", sound: null},
		9: {name: "D2", sound: null},
		10: {name: "D3", sound: null},
		11: {name: "D4", sound: null},
		12: {name: "D5", sound: null},
		13: {name: "Ds2", sound: null},
		14: {name: "Ds3", sound: null},
		15: {name: "Ds4", sound: null},
		16: {name: "Ds5", sound: null},
		17: {name: "E2", sound: null},
		18: {name: "E3", sound: null},
		19: {name: "E4", sound: null},
		20: {name: "E5", sound: null},	
		21: {name: "F2", sound: null},
		22: {name: "F3", sound: null},
		23: {name: "F4", sound: null},
		24: {name: "F5", sound: null},
		25: {name: "Fs2", sound: null},
		26: {name: "Fs3", sound: null},
		27: {name: "Fs4", sound: null},
		28: {name: "Fs5", sound: null},
		29: {name: "G2", sound: null},
		30: {name: "G3", sound: null},
		31: {name: "G4", sound: null},
		32: {name: "G5", sound: null},
		33: {name: "Gs2", sound: null},
		34: {name: "Gs3", sound: null},
		35: {name: "Gs4", sound: null},
		36: {name: "Gs5", sound: null},
		37: {name: "A2", sound: null},
		38: {name: "A3", sound: null},
		39: {name: "A4", sound: null},
		40: {name: "A5", sound: null},
		41: {name: "As2", sound: null},
		42: {name: "As3", sound: null},
		43: {name: "As4", sound: null},
		44: {name: "As5", sound: null},
		45: {name: "B2", sound: null},
		46: {name: "B3", sound: null},
		47: {name: "B4", sound: null},
		48: {name: "B5", sound: null}
	},
	length : 49
}