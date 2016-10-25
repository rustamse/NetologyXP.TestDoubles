import assert from 'assert'
import {Barman} from '../src/barmen'
import {Client} from '../src/client'

suite('when client ask 200 grams of whisky', function () {
    const drinkName = 'whisky';
    const clientAskVolume = 200;

    suite('barman has enough', function () {

        const cupboardStub = {
            hasDrink: function () {
                return true;
            },
            getDrink: function () {
                return clientAskVolume;
            }
        };

        test('barman pour 200 grams of whisky', function () {
            const clientStub = {
                isDrunken: function () {
                    return false;
                }
            };

            var barman = new Barman(cupboardStub);

            var volumeInGlass = barman.pour(drinkName, clientAskVolume, clientStub);

            assert.equal(clientAskVolume, volumeInGlass);
        });

        test('barman refused because client is drunked', function () {
            const clientStub = {
                isDrunken: function () {
                    return true;
                }
            };

            var barman = new Barman(cupboardStub);

            var volumeInGlass = barman.pour(drinkName, clientAskVolume, clientStub);

            assert.equal(0, volumeInGlass);
        });
    });

    suite('no whisky in cupboard', function () {

        const cupboardStub = {
            hasDrink: function () {
                return false;
            }
        };
        const clientStub = {
            isDrunken: function () {
                return false;
            }
        };

        test('barman confused while pouring', function () {

            var barman = new Barman(cupboardStub);

            assert.throws(() => barman.pour(drinkName, clientAskVolume, clientStub), /Not enough whisky/);
        });
    });

    teardown(function () {
        console.log('teardown');
    })
});