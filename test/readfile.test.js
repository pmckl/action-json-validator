const readfile = require('../src/readfile');

test('should return empty string', async () => {
    await expect(readfile('foo')).toBe('');
});

test('should not return empty string', async () => {
    await expect(readfile('./test/test-files/schema.json')).not.toBe('');
});