import assert from 'assert'
import sinon from 'sinon'
import {Barman} from '../src/barmen'
import {Client} from '../src/client'
import {Cupboard} from '../src/cupboard'
import {BottlesStore} from '../src/bottlesStore'

suite('barmen pour whisky', function () {
    const drinkName = 'whisky';

    suite('when client ask 200 grams', function () {
        const clientAskVolume = 200;

        suite('barmen has enough', function () {

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

            test('barmen took exactly 200 grams of whisky from cupboard', function () {
                const clientStub = {
                    isDrunken: function () {
                        return false;
                    }
                };
                var cupboard = new Cupboard(new BottlesStore());
                var cupboardMock = sinon.mock(cupboard);
                cupboardMock.expects('getDrink')
                    .withArgs(drinkName, clientAskVolume)
                    .once()
                    .returns(clientAskVolume);

                var barman = new Barman(cupboard);

                var volumeInGlass = barman.pour(drinkName, clientAskVolume, clientStub);

                cupboardMock.verify();
            });

            test('barmen check if cupboard contains at least 200 grams of whisky', function () {
                const clientStub = {
                    isDrunken: function () {
                        return false;
                    }
                };
                var cupboard = new Cupboard(new BottlesStore());
                var cupboardMock = sinon.mock(cupboard);
                cupboardMock.expects('hasDrink')
                    .withArgs(drinkName, clientAskVolume)
                    .once()
                    .returns(clientAskVolume);

                var barman = new Barman(cupboard);

                var volumeInGlass = barman.pour(drinkName, clientAskVolume, clientStub);

                cupboardMock.verify();
            });

            test('barman always check is client drunked', function () {
                var client = new Client();
                var clientMock = sinon.mock(client);
                clientMock.expects('isDrunken')
                    .once()
                    .returns(false);

                var barman = new Barman(cupboardStub);

                var volumeInGlass = barman.pour(drinkName, clientAskVolume, client);

                clientMock.verify();
            });

            test('barmen refused because client is drunked', function () {
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
    });

    suite('when client ask non positive grams', function () {
        const clientAskVolume = -10;

        const cupboardStub = {};
        const clientStub = {};

        test('barman confused while pouring', function () {
            var barman = new Barman(cupboardStub);

            assert.throws(() => barman.pour(drinkName, clientAskVolume, clientStub), /Invalid volume of whisky/);
        });
    });
});