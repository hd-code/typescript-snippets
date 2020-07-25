import assert from 'assert';
import * as storage from '../src/storage';

import * as fs from 'fs';
import * as path from 'path';

// -----------------------------------------------------------------------------

const tmpPath = path.join(__dirname, 'storage-ctxghtbsi.json');
setTimeout(() => {fs.unlink(tmpPath, () => {})}, 100);

TestStorage('CacheStorage', storage.CacheStorage);

TestStorage('LocalStorage', () => {
    try {fs.unlinkSync(tmpPath)} catch (_) {}
    return storage.LocalStorage(tmpPath);
});

// -----------------------------------------------------------------------------

interface IPerson {
    firstname: string;
    lastname: string;
    age: number;
}

const id1 = 'first';
const person1: IPerson = {
    firstname: 'John',
    lastname: 'Doe',
    age: 28,
}

const id2 = 'second';
const person2: IPerson = {
    firstname: 'Jane',
    lastname: 'Doe',
    age: 25,
}

const id3 = 'third';
const person3: IPerson = {
    firstname: 'Jim',
    lastname: 'Doe',
    age: 5,
}

const filledStorage: storage.StorageMap<IPerson> = {
    [id1]: person1,
    [id2]: person2,
    [id3]: person3,
};

function TestStorage(msg: string, InitStorage: () => storage.Storage<IPerson>) {
    const initFilledStorage = () =>  {
        const cache = InitStorage();
        cache.set(id1, person1);
        cache.set(id2, person2);
        cache.set(id3, person3);
        return cache;
    }

    describe(msg, () => {
        it('clear()', () => {
            const cache = initFilledStorage();
            assert.deepStrictEqual(cache.clear(), filledStorage, 'did not return former cache content');
            assert.deepStrictEqual(cache.getAll(), {}, 'should be empty after clearing');
        });

        it('delete()', () => {
            const cache = initFilledStorage();

            const deleted2 = cache.delete(id2);
            assert.deepStrictEqual(deleted2, person2, 'deleted element was not correct');
            assert.deepStrictEqual(cache.get(id2), undefined, 'failed to delete element');

            const deleted3 = cache.delete(id3);
            assert.deepStrictEqual(deleted3, person3, 'deleted element was not correct');
            assert.deepStrictEqual(cache.get(id3), undefined, 'failed to delete element');

            assert.deepStrictEqual(cache.getAll(), {[id1]: person1}, 'only first element should be in cache');
        });

        describe('filter()', () => {
            it('should return all entries for always true filter', () => {
                const cache = initFilledStorage();
                const filtered = cache.filter(() => true)
                assert.deepStrictEqual(filtered, filledStorage);
            });

            it('should return all entries when all match the filter', () => {
                const cache = initFilledStorage();
                const filtered = cache.filter(person => person.lastname === 'Doe');
                assert.deepStrictEqual(filtered, filledStorage);
            });

            it('should return the matching entries', () => {
                const cache = initFilledStorage();
                const filtered = cache.filter(person => person.firstname === 'John');
                assert.deepStrictEqual(filtered, {[id1]: person1});
            });

            it('should return no entries when no entry matches filter', () => {
                const cache = initFilledStorage();
                const filtered = cache.filter(person => person.age === -1);
                assert.deepStrictEqual(filtered, {});
            });

            it('should return no entries when filter accesses invalid properties', () => {
                const cache = initFilledStorage();
                const filtered = cache.filter(person => (person as any).foo === 0);
                assert.deepStrictEqual(filtered, {});
            });
        });

        describe('get()', () => {
            it('should return the referenced entry', () => {
                const cache = initFilledStorage();
                assert.deepStrictEqual(cache.get(id2), person2);
            });

            it('should return undefined for a non-existing id', () => {
                const cache = initFilledStorage();
                assert.deepStrictEqual(cache.get('Do I exist?'), undefined);
            });
        });

        it('getAll()', () => {
            const cache = initFilledStorage();
            assert.deepStrictEqual(cache.getAll(), filledStorage);
        });

        it('save()', () => {
            const cache = InitStorage();

            const id1 = cache.save(person1);
            const id2 = cache.save(person2);

            assert.strictEqual(id1.length, 16, 'id1 should have 16 digits');
            assert(/[0-9abcdef]*/.test(id1), 'id1 should be a hex string');

            assert.strictEqual(id2.length, 16, 'id2 should have 16 digits');
            assert(/[0-9abcdef]*/.test(id2), 'id2 should be a hex string');

            const expected = {
                [id1]: person1,
                [id2]: person2,
            };
            const actual = cache.getAll();

            assert.deepStrictEqual(actual, expected);
        });

        describe('set()', () => {
            it('should return undefined for a new id and item', () => {
                const cache = InitStorage();
                const old = cache.set(id2, person2);
                assert.deepStrictEqual(old, undefined, 'there should not be a former element');
                assert.deepStrictEqual(cache.get(id2), person2, 'did not save element');
            });

            it('should return the former element for an existing id', () => {
                const cache = InitStorage();
                cache.set(id1, person1);
                const old = cache.set(id1, person3);
                assert.deepStrictEqual(old, person1, 'did not return former element');
                assert.deepStrictEqual(cache.get(id1), person3, 'did not update element');
            });
        });
    });
}