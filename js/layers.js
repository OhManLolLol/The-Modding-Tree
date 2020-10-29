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
            if (hasUpgrade("b", 14)) mult.times(upgradeEffect("b", 14))
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        upgrades: {
            rows: 1,
            cols: 4,
            11: {
                title: "Another mod..",
                description: "Stupidity gain is doubled",
                cost: new Decimal(5),
                effect() {
                    return new Decimal(2)
                },
                unlocked() { return true },
            },
            12: {
                title: "This one's boring",
                description: "Stupidity gain is doubled.. again",
                cost: new Decimal(10),
                effect() {
                    return new Decimal(2)
                },
                unlocked() { return (hasUpgrade(this.layer, 11)) },
            },
            13: {
                title: "Currencies are dumb",
                description: "Stupidity gain is.. TRIPLED!!",
                cost: new Decimal(15),
                effect() {
                    return new Decimal(3)
                },
                unlocked() { return (hasUpgrade(this.layer, 12)) },
            },
            14: {
                title: "Braincells? Really?",
                description: "Braincell gain is doubled.",
                cost: new Decimal(25),
                effect() {
                    return new Decimal(2e7)
                },
                unlocked() { return (hasUpgrade(this.layer, 13)) },
            },
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "b", description: "B - Reset for braincells", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
})
