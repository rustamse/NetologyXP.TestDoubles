import assert from 'assert'
import {Barman} from '../src/barmen'
import {Client} from '../src/client'

suite('when client ask 200 grams of whisky', function () {
    const drinkName = 'whisky';
    const clientAskVolume = 200;

    suite('barman has enough', function () {
        test('barman pour 200 grams of whisky', function () {
            const cupboardStub = {
                hasDrink: function () {
                    return true;
                },
                getDrink: function () {
                    return clientAskVolume;
                }
            };
            const clientStub = {
                isDrunken: function () {
                    return false;
                }
            };

            var barman = new Barman(cupboardStub);

            var volumeInGlass = barman.pour(drinkName, clientAskVolume, clientStub);

            assert.equal(clientAskVolume, volumeInGlass);
        });
    });

    teardown(function () {
        console.log('teardown');
    })
});