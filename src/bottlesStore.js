'use strict';

module.exports = {
    BottlesStore: function () {

        this._storedBottles = [];

        this.addBottlesToStore = function (bottles) {
            for (let i = 0; i < bottles.length; i++) {
                this._storedBottles.push(bottles[i]);
            }
        };

        this.hasDrink = function (drinkName, volume) {
            var total = this._storedBottles.filter((bottle)=>bottle.name == drinkName)
                .reduce((totalVolume, bottle) => totalVolume += bottle.volume, 0);

            return total >= volume;
        };

        this.getBottle = function (drinkName) {
            let foundIndex = -1;
            var foundBottle;
            for (let i = 0; i < this._storedBottles.length; i++) {
                let bottle = this._storedBottles[i];
                if (bottle.name == drinkName) {
                    foundIndex = i;
                    foundBottle = bottle;
                    break;
                }
            }

            if (foundIndex === -1)
                throw new Error('Not found bottle at store');

            this._storedBottles.splice(foundIndex, 1);

            return foundBottle;
        }
    }
};