const wordGroups = [
	[ // -ag
		"bag", "brag", "drag", "flag", "gag", "hag", "lag", "nag",
		"rag", "sag", "snag", "tag", "wag", "wigwag", "zigzag"
	],
	[ // -ake
		"bake", "cake", "fake", "lake", "make", "shake", "snake", "take", "wake"
	],
	[ // -ap
		"cap", "chap", "clap", "gap", "lap", "map", "nap", "pap", "rap", "sap",
		"slap", "snap", "strap", "tap", "trap"
	],
	[ // -ash
		"ash", "bash", "cash", "dash", "crash", "flash", "hash", "lash", "mash",
		"rash", "sash", "slash", "smash", "thrash", "trash"
	],
	[ // -awn
		"dawn", "fawn", "lawn", "yawn"
	],
	[ // -ax
		"ax", "lax", "tax", "wax", "relax"
	],
	[ // -and
		"band", "brand", "gland", "grand", "hand", "land", "rand",
		"sand", "stand", "understand"
	],
	[ // -ack
		"back", "black", "crack", "jack", "pack", "sack", "shack", "smack"
	],
	[ // -alk
		"talk", "walk", "chalk", "balk"
	],
	[ // -ay
		"bay", "clay", "day", "gray", "hay", "jay", "lay", "nay", "may",
		"pay", "play", "ray", "say", "stray", "way", "sway"
	],
	[ // -age
		"age", "cage", "page", "rage", "stage", "wage"
	],
	[ // -am
		"am", "clam", "dam", "ham", "jam", "ram", "beam", "cream", "dream",
		"gleam", "scream", "steam", "stream", "team"
	],
	[ // -ape
		"cape", "drape", "grape", "tape"
	],
	[ // -ast
		"blast", "cast", "fast", "last", "mast", "past", "outcast"
	],
	[ // -act
		"act", "fact", "pact"
	],
	["bang", "clang", "fang", "gang", "hang", "pang", "rang", "sang", "slang"], //-ang
	["bar", "car", "far", "jar", "mar", "star", "tar", "guitar"], //-ar
	["bad", "cad", "dad", "fad", "gad", "glad", "had", "lad", "mad", "pad", "sad", "bread", "dead"], //-ad
	["fail", "hail", "jail", "mail", "nail", "rail", "sail", "snail", "tail"], //-ail
	["came", "dame", "fame", "flame", "lame", "name", "tame", "same", "shame", "became", "nickname"], //-ame
	["claw", "draw", "flaw", "law", "maw", "paw", "raw", "saw", "straw"], //-aw
	["bank", "drank", "Hank", "plank", "prank", "rank", "sank", "spank", "tank", "thank", "yank"],//-ank
	["ark", "bark", "dark", "hark", "lark", "mark", "park", "shark", "remark"], //-ark
	["blaze", "daze", "graze", "gaze", "haze", "maze"], //-aze
	["cane", ";ane", "sane", "airplane", "wane", "Jane"],//-ane
	["ball", "call", "fall", "gall", "hall", "small", "tall", "wall"],//all
	["blade", "fade", "grade", "jade", "made", "shade", "spade", "trade", "wade", "parade", "marmalade", "serenade"],//-ade
	["camp", "lamp", "ramp", "stamp", "tramp", "vamp"],//-amp
	["ant", "chant", "grant", "pant", "plant", "slant"],//-ant
	["faint", "paint", "saint"],
	["art", "cart", "chart", "dart", "part", "smart", "start"],
	["plan", "ran", "tan", "van", "began", "Japan", "ban", "can", "fan", "man", "pan", "bean", "clean", "dean", "lean"],
	["beach", "bleach", "each", "peach", "preach", "reach", "teach"],
	["bed", "fed", "led", "red", "shed", "sled", "wed", "bleed", "breed", "deed", "feed", "need", "seed", "weed"],
	["Ben", "den", "glen", "hen", "ken", "men", "pen", "ten", "then", "when"],
	["chess", "dress", "less", "mess", "press", "stress", "address", "recess", "success"],
	["brick", "chick", "click", "kick", "lick", "nick", "pick", "quick", "sick", "stick", "thick", "tick", "wick"],
	["brief", "chief", "grief", "thief", "belief", "relief"],
	["crime", "dime", "lime", "slime", "time", "bedtime"],
	["dike", "hike", "like", "pike", "spike", "strike", "alike", "dislike"],
	["brim", "dim", "grim", "him", "rim", "skim", "slim", "swim", "trim", "vim", "whim"],
	["cheek", "creek", "Greek", "leek", "seek", "reek", "week"],
	["best", "chest", "crest", "quest", "jest", "nest", "pest", "rest", "test", "west", "zest"],
	["bee", "flee", "free", "see", "three", "tree"],
	["bend", "blend", "end", "friend", "lend", "mend", "send", "spend", "tend", "trend", "attend", "defend", "depend", "pretend"],
];

var possibleWords = [];
var wordOne;
var wordTwo;

var generated = false;
var correct = 0;
var incorrect = 0;

/**
 * Gets a random index, then calls "GetUniqueIndex" to get a second index
 * @param {array} list List to get random indexes for
 * @returns Two indexes as an array
 */
function GetRandomIndexs(list) {
	if (list.length < 2) {
		throw new Error("List too short");
	}

	const indexOne = Math.floor(Math.random() * list.length);
	const indexTwo = GetUniqueIndex(list, indexOne);

	return [indexOne, indexTwo];
}

/**
 * Obtains a unique index
 * @param {array} list List to get the unique index for
 * @param {int} indexOne Index that was already selected in the calling function
 * @returns A unique index
 */
function GetUniqueIndex(list, indexOne) {
	var outIndex = Math.floor(Math.random() * list.length);
	if (outIndex == indexOne) {
		return GetUniqueIndex(list, indexOne);
	}
	else {
		return outIndex;
	}
}

/**
 * This picks two lists and combines them. Doing this increases the chance of getting words that Rhyme
 */
function SelectPossibleWords() {
	const indexes = GetRandomIndexs(wordGroups);
	console.log(indexes);
	possibleWords = wordGroups[indexes[0]].concat(wordGroups[indexes[1]]);
}

function ActualWords() {
	const wordIndexes = GetRandomIndexs(possibleWords);
	wordOne = possibleWords[wordIndexes[0]];
	wordTwo = possibleWords[wordIndexes[1]];
}

function GenerateWords() {
	SelectPossibleWords()
	ActualWords();
}

function speak() {
	if (!generated) {
		GenerateWords();
		generated = true;
		const button = document.getElementById("SpeakButton");
		button.textContent = "Say words again";
	}
	const utteranceOne = new SpeechSynthesisUtterance(wordOne);
	const utteracneTwo = new SpeechSynthesisUtterance(wordTwo);

	speechSynthesis.speak(utteranceOne);

	setTimeout(() => {
		speechSynthesis.speak(utteracneTwo);
	}, 3000);
}

function AllowNewWords(){
	generated = false;
	const button = document.getElementById("SpeakButton");
	button.textContent = "New Words";
}


/**
 * 
 * @returns Array of the 2 generated words
 */
function GetWords() {
	return [wordOne, wordTwo];
}

function DoWordsRhyme() {
	for (let group of wordGroups) {
		if (group.includes(wordOne) && group.includes(wordTwo)) {
			return true;
		}
	}
	return false;
}

function IsCorrect(answer) {
	if (!generated) {
		return;
	}

	const correctText = document.getElementById("Score");
	if (answer && DoWordsRhyme()) {
		correct++;
		console.log("2 true");
	} else if (!answer && !DoWordsRhyme()) {
		correct++;
		console.log("2 false");
	} else {
		incorrect++;
		console.log("Other");
	}

	correctText.textContent = correct + " Correct and " + incorrect + " Incorrect";
	AllowNewWords();
}
