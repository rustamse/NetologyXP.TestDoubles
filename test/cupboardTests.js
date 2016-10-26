import assert from 'assert'
import sinon from 'sinon'
import {BottlesStore} from '../src/bottlesStore'
import {BottlesStoreFake} from './bottlesStoreFake'
import {Cupboard} from '../src/cupboard'

suite('Cupboard has drink', function () {

    suite('Cupboard contains 1 bottle of whisky and 2 bottles of tequila', function () {

        test('BottlesStore has 200g of whisky', function () {
            const drinkName = 'whisky';
            const askVolume = 200;

            var cupboard = new Cupboard(new BottlesStoreFake());

            var hasDrink = cupboard.hasDrink(drinkName, askVolume);

            assert.equal(true, hasDrink);
        });

    });
});