import assert from 'assert'
import sinon from 'sinon'
import {BottlesStore} from '../src/bottlesStore'

suite('BottlesStore has drink', function () {

    suite('BottlesStore contains 1 bottle of whisky and 2 bottles of tequila', function () {

        var bottlesStore;

        setup(function () {
            bottlesStore = new BottlesStore();
            bottlesStore.addBottlesToStore([{name: 'whisky', volume: 500}, {
                name: 'tequila',
                volume: 500
            }, {name: 'tequila', volume: 500}]);
        });

        test('BottlesStore has 300g of whisky', function () {
            let askVolume = 300;

            var hasDrink = bottlesStore.hasDrink('whisky', askVolume);

            assert.equal(true, hasDrink);
        });

        test('BottlesStore NOT has 600g of whisky', function () {
            let askVolume = 600;

            var hasDrink = bottlesStore.hasDrink('whisky', askVolume);

            assert.equal(false, hasDrink);
        });

        test('BottlesStore has 900g of tequila', function () {
            let askVolume = 900;

            var hasDrink = bottlesStore.hasDrink('tequila', askVolume);

            assert.equal(true, hasDrink);
        });
    });
});

suite('BottlesStore get bottle drink', function () {

    suite('BottlesStore contains 1 bottle of whisky', function () {

        var bottlesStore;

        setup(function () {
            bottlesStore = new BottlesStore();
            bottlesStore.addBottlesToStore([{name: 'whisky', volume: 500}]);
        });

        test('obtained bottle of whisky', function () {
            let askBottleName = 'whisky';

            var obtainedBottle = bottlesStore.getBottle(askBottleName);

            assert.equal(askBottleName, obtainedBottle.name);
        });

        test('Exception when obtained bottle of tequila', function () {
            let askBottleName = 'tequila'

            assert.throws(() => bottlesStore.getBottle(askBottleName), /Not found bottle at store/);
        });

        test('Exception when try to obtain second bottle of whisky', function () {
            let askBottleName = 'whisky';

            var obtainedBottle = bottlesStore.getBottle(askBottleName);
            assert.throws(() => bottlesStore.getBottle(askBottleName), /Not found bottle at store/);
        });
    });
});