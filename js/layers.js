addLayer("b", {
        name: "braincells", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#4BDC13",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "braincells", // Name of prestige currency
        baseResource: "stupidity", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            if (hasUpgrade("b", 14)) mult = mult.times(upgradeEffect("b", 14))
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        upgrades: {
            rows: 2,
            cols: 4,
            11: {
                title: "Another mod..",
                description: "Stupidity gain is doubled",
                cost: new Decimal(5),
                effect() {
                    let u1 = new Decimal(2)
                    if (hasUpgrade("b", 22)) u1 = u1.times(upgradeEffect("b", 22))
                    return u1;
                },
                unlocked() { return true },
            },
            12: {
                title: "This one's boring",
                description: "Stupidity gain is doubled.. again",
                cost: new Decimal(10),
                effect() {
                    let u2 = new Decimal(2)
                    if (hasUpgrade("b", 22)) u2 = u2.times(upgradeEffect("b", 22))
                    return u2;
                },
                unlocked() { return (hasUpgrade(this.layer, 11)) },
            },
            13: {
                title: "Currencies are dumb",
                description: "Stupidity gain is.. TRIPLED!!",
                cost: new Decimal(15),
                effect() {
                    let u3 = new Decimal(3)
                    if (hasUpgrade("b", 22)) u3 = u3.times(upgradeEffect("b", 22))
                    return u3;
                },
                unlocked() { return (hasUpgrade(this.layer, 12)) },
            },
            14: {
                title: "Braincells? Really?",
                description: "Braincell gain is doubled.",
                cost: new Decimal(25),
                effect() {
                    return new Decimal(2)
                },
                unlocked() { return (hasUpgrade(this.layer, 13)) },
            },
            21: {
                title: "Stupidity too?",
                description: "Stupidity gain is faster based on unspent braincells.",
                cost: new Decimal(60),
                effect() {
                    let poweff = 1
                    let seff = player["b"].points.pow(0.25).add(1).pow(poweff).log(2)
                    return seff;
                },
                unlocked() { return (hasUpgrade(this.layer, 14)) },
            },
            22: {
                title: "What are these names?",
                description: "Triples 1st row upgrades except 'Braincells? Really?' effects.",
                cost: new Decimal(150),
                effect() {
                    return new Decimal(3)
                },
                unlocked() { return (hasUpgrade(this.layer, 21)) },
            },
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "b", description: "Reset for braincells", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
})

addLayer("i", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                    // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FE0102",                       // The color for this layer, which affects many elements
    resource: "intelligence",            // The name of this layer's main prestige resource
    row: 1,                                 // The row this layer is on (0 is the first row)

    baseResource: "braincells",                 // The name of the resource your prestige gain is based on
    baseAmount() {return player.b.points},
    
    branches: ["b", "i"],   // A function to return the current value of that resource

    requires: new Decimal(10000),            // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.
    
    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 2,                          // "normal" prestige gain is (currency^exponent)

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource
        return new Decimal(1)               // Factor in any bonuses multiplying gain here
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource
        return new Decimal(1)
    },

    layerShown() {
        if (player.b.points >= 10000 || player.i.points >= 1) {return true}
    },             // Returns a bool for if this layer's node should be visible in the tree.
})