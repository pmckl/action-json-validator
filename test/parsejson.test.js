const parsejson = require('../src/parsejson');

test('should return empty object', async () => {
    await expect(parsejson('')).toEqual({});
});

test('should not return empty object', async () => {
    await expect(parsejson('{"id": "/SimplePerson"}')).not.toEqual({});
});