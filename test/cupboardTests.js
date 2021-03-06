import assert from 'assert'
import sinon from 'sinon'
import {BottlesStoreFake_1whisky_2tequila} from './BottlesStoreFake_1whisky_2tequila'
import {Cupboard} from '../src/cupboard'

suite('Cupboard contains in BottlesStore 1 bottle of whisky and 2 bottles of tequila', function () {

    suite('Cupboard has drink', function () {

        test('Cupboard has 200g of whisky', function () {
            const drinkName = 'whisky';
            const askVolume = 200;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            var hasDrink = cupboard.hasDrink(drinkName, askVolume);

            assert.equal(true, hasDrink);
        });

        test('Cupboard NOT has 600g of whisky', function () {
            const drinkName = 'whisky';
            const askVolume = 600;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            var hasDrink = cupboard.hasDrink(drinkName, askVolume);

            assert.equal(false, hasDrink);
        });

        test('Cupboard has 900g of tequila', function () {
            const drinkName = 'tequila';
            const askVolume = 900;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            var hasDrink = cupboard.hasDrink(drinkName, askVolume);

            assert.equal(true, hasDrink);
        });

    });

    suite('Cupboard get drink', function () {

        test('Cupboard get 200g of whisky', function () {
            const drinkName = 'whisky';
            const askVolume = 200;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            var obtainedVolume = cupboard.getDrink(drinkName, askVolume);

            assert.equal(askVolume, obtainedVolume);
        });

        test('EXCEPT when try to get second bottle of whisky', function () {
            const drinkName = 'whisky';
            const askVolume = 500;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            var obtainedVolume = cupboard.getDrink(drinkName, askVolume);

            assert.throws(() => cupboard.getDrink(drinkName, askVolume), /Not found bottle with whisky/);
        });

        test('EXCEPT when Cupboard get 600g of whisky', function () {
            const drinkName = 'whisky';
            const askVolume = 600;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            assert.throws(() => cupboard.getDrink(drinkName, askVolume), /Not found bottle with whisky/);
        });

        test('Cupboard get 800g of tequila', function () {
            const drinkName = 'tequila';
            const askVolume = 800;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            var obtainedVolume = cupboard.getDrink(drinkName, askVolume);

            assert.equal(askVolume, obtainedVolume);
        });

        test('EXCEPT when Cupboard get 1100g of tequila', function () {
            const drinkName = 'tequila';
            const askVolume = 1100;

            var cupboard = new Cupboard(new BottlesStoreFake_1whisky_2tequila());

            assert.throws(() => cupboard.getDrink(drinkName, askVolume), /Not found bottle with tequila/);
        });
    });
});
