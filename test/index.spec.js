var bool = require('../dist/boolean.min');
var expect = require('chai').expect;

describe('test same', function () {
    it('Same Object', function () {
        expect(bool.same(
            {
                a: '1',
                b: '2'
            },
            {
                b: '2'
            }
        )).to.be.deep.equal({
            b: '2'
        });

        expect(bool.same(
            {
                a: '1',
                b: '2'
            },
            {
                a: '3',
                b: '2'
            }
        )).to.be.deep.equal({
            b: '2'
        });

        expect(bool.same(
            {
                a: '1',
                b: '2'
            },
            {
                a: '3',
                b: '5'
            }
        )).to.be.deep.equal({});

        expect(bool.same(
            {
                a: '1',
                b: '2',
                c: {}
            },
            ['a', 'b', 'c'],
            ['b', 'c']
        )).to.be.deep.equal({
            b: '2',
            c: {}
        });
    });

    it('Same Array', function () {
        expect(bool.same(
            [1, 2, 3, 4],
            [0, 1, 3, 7]
        )).to.be.deep.equal([1, 3]);
    });
});

describe('test merge', function () {
    it('should be depply equal', function () {
        expect(bool.merge(
            {
                a: '1',
                b: '2'
            },
            {
                b: 2
            },
            null,
            {
                c: 10086
            }
        )).to.be.deep.equal({
            a: '1',
            b: 2,
            c: 10086
        });

        expect(bool.merge(
            [1, 2, 3],
            [2, 4]
        )).to.be.deep.equal([1, 2, 3, 4]);

        var arr = [1, 2, 3];
        expect(bool.merge(
            arr,
            null,
            [2, 4]
        )).to.be.equal(arr);
    });
});

describe('test exclude', function () {
    it('Object exclude by object', function () {
        expect(bool.exclude(
            {
                a: '1',
                b: '2'
            },
            {
                b: '2',
                a: 1
            }
        )).to.be.deep.equal({
            a: '1'
        });
    });

    it('Object exclude by keys', function () {
        expect(bool.exclude(
            {
                a: '1',
                b: '2'
            },
            ['a']
        )).to.be.deep.equal({
            b: '2'
        });
    });

    it('Array exclude', function () {
        expect(bool.exclude(
            [1, 2, '3'],
            [2]
        )).to.be.deep.equal([1, '3']);
    });
});

describe('test isEqual', function () {
    it('should be equal', function () {
        expect(bool.isEqual(
            {
                a: '1',
                b: '2'
            },
            {
                a: '1',
                b: '2'
            }
        )).to.be.ok;

        expect(bool.isEqual(
            {
                a: '1',
                b: '2',
                c: {
                    d: ['e', 'f', 1, true]
                }
            },
            {
                a: '1',
                b: '2',
                c: {
                    d: ['e', 'f', 1, true]
                }
            }
        )).to.be.ok;

        expect(bool.isEqual(NaN, NaN)).to.be.ok;
        expect(bool.isEqual(new Date(1234567890123), new Date(1234567890123))).to.be.ok;
    });

    it('should not be equal', function () {
        expect(bool.isEqual(
            {
                a: '1',
                b: '2'
            },
            {
                a: '1'
            }
        )).to.not.be.ok;

        expect(bool.isEqual(
            {
                a: '1',
                b: '2',
                c: {
                    d: ['e', 'f', 1, 1]
                }
            },
            {
                a: '1',
                b: '2',
                c: {
                    d: ['e', 'f', 1, true]
                }
            }
        )).to.not.be.ok;

        expect(bool.isEqual(-0, 0)).to.not.be.ok;
    });
});

describe('test isContain', function () {
    it('Object Contain', function () {
        expect(bool.isContain(
            {
                a: '1',
                b: '2'
            },
            {
                a: '1'
            }
        )).to.be.ok;

        expect(bool.isContain(
            {
                a: '1',
                b: '2'
            },
            {
                a: '2'
            }
        )).to.not.be.ok;

        expect(bool.isContain(
            {
                a: '1',
                b: '2'
            },
            {
                a: 1
            }
        )).to.not.be.ok;
    });

    it('Array Contain', function () {
        expect(bool.isContain(
            [1, 2, 3, 4],
            [2, 3]
        )).to.be.ok;
    });
});
