'use strict';

module.exports = {
    Cupboard: function (bottlesStore) {

        this.bottlesStore = bottlesStore;

        this.isOpen = function () {
            /**/
            return true;
        };

        this.hasDrink = function (drinkName, volume) {
            return this.bottlesStore.hasDrink(drinkName, volume);
        };

        this.getDrink = function (drinkName, volume) {

            let remainedVolume = volume;

            while (remainedVolume > 0) {
                let pourVolume = this._pourFromNextBottle(drinkName, remainedVolume);

                remainedVolume -= pourVolume;
            }

            return volume;
        };

        this._pourFromNextBottle = function (drinkName, remainedVolume) {
            let bottle = this.bottlesStore.getBottle(drinkName);
            if(bottle === null)
                throw new Error('Not found bottle with ' + drinkName);

            // смотрим достаточно ли в бутылке объема.
            let pourVolume = bottle.volume >= remainedVolume ?
                remainedVolume :
                bottle.volume;

            bottle.volume -= pourVolume;
            if (bottle.volume > 0) {
                // возвращаем бутылку обратно на склад, если она не пустая.
                this.bottlesStore.addBottlesToStore([bottle]);
            }

            return pourVolume;
        };
    }
};