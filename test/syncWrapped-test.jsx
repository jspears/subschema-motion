"use strict";

import expect from 'expect';
import wrapValue from '../src/syncWrapped';

describe("syncWrapped", function () {
    const vals = [
        {
            test: 'abc'
        },
        {
            test: 'bdef'
        },
        {
            test: 'abc'
        }
    ];

    it('should compare elements', function () {
        const wrapped = vals.map((value, key)=> ({key, value}));

        const result = wrapValue(wrapped, vals);

        expect(result[0].value).toBe(vals[0]);
        expect(result[1].value).toBe(vals[1]);
        expect(result[2].value).toBe(vals[2]);
        expect(result.length).toBe(3);
    });

    it('should reorder', function () {
        const wrapped = [
            {
                key: 0,
                value: vals[1]
            },
            {
                key: 1,
                value: vals[0]
            }, {
                key: 2,
                value: vals[2]
            }];

        const result = wrapValue(wrapped, vals);

        expect(result[0].value).toBe(vals[0]);
        expect(result[1].value).toBe(vals[1]);
        expect(result[2].value).toBe(vals[2]);
        expect(result.length).toBe(3);
    });
    it('should remove', function () {
        const wrapped = [
            {
                key: 3,
                value: {
                    test: 'val'
                }
            },
            {
                key: 0,
                value: vals[1]
            },
            {
                key: 1,
                value: vals[0]
            }, {
                key: 2,
                value: vals[2]
            }];

        const result = wrapValue(wrapped, vals);

        expect(result[0].value).toBe(vals[0]);
        expect(result[1].value).toBe(vals[1]);
        expect(result[2].value).toBe(vals[2]);
        expect(result.length).toBe(3);
    });
    it('should add', function () {
        const wrapped = [

            {
                key: 1,
                value: vals[0]
            }, {
                key: 2,
                value: vals[2]
            }];

        const result = wrapValue(wrapped, vals);
        expect(result.length).toBe(3);
        expect(result[0].value).toBe(vals[0]);
        expect(result[1].value).toBe(vals[1]);
        expect(result[2].value).toBe(vals[2]);
    });
});