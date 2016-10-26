'use strict';

module.exports = {
    BottlesStoreFake_1whisky_2tequila: function () {
        this._whisky1 = {name: 'whisky', volume: 500};
        this._tequila1 = {name: 'tequila', volume: 500};
        this._tequila2 = {name: 'tequila', volume: 500};

        this.addBottlesToStore = function (bottles) {
            for (let i = 0; i < bottles.length; i++) {
                let bottle = bottles[i];
                if (bottle.name == 'whisky') {
                    this._whisky1 = bottle;
                }
                else if (bottle.name == 'tequila') {
                    if (this._tequila1 === null)
                        this._tequila1 = bottle;
                    else if (this._tequila2 === null)
                        this._tequila2 = bottle;
                }
            }
        };

        this.hasDrink = function (drinkName, volume) {
            let sum = 0;

            if (drinkName == 'whisky') {
                if (this._whisky1)
                    sum += this._whisky1.volume;
            }
            if (drinkName == 'tequila') {
                if (this._tequila1)
                    sum += this._tequila1.volume;
                if (this._tequila2)
                    sum += this._tequila2.volume;
            }

            return sum >= volume;
        };

        this.getBottle = function (drinkName) {

            var result = null;
            if (drinkName == 'whisky') {
                result = this._whisky1;
                this._whisky1 = null;
            }
            if (drinkName == 'tequila') {
                if (this._tequila1) {
                    result = this._tequila1;
                    this._tequila1 = null;
                }
                else if (this._tequila2) {
                    result = this._tequila2;
                    this._tequila2 = null;
                }
            }

            return result;
        }
    }
};