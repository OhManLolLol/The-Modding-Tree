let modInfo = {
	name: "The Tree of Insanity",
	id: "upurbutandaroundthecorner",
	author: "OhMan i think",
	pointsName: "stupidity",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
    offlineLimit: 1,  // In hours
    initialStartPoints: new Decimal (10) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "First layer. Minimal content and upgrades.",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("b", 11)) gain = gain.times(upgradeEffect("b", 11))
	if (hasUpgrade("b", 12)) gain = gain.times(upgradeEffect("b", 12))
	if (hasUpgrade("b", 13)) gain = gain.times(upgradeEffect("b", 13))
	if (hasUpgrade("b", 21)) gain = gain.times(upgradeEffect("b", 21))
	if (player.i.points >= 1) gain = gain.times(player.i.points.pow(3).add(3))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}