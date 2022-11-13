const validate = require('../src/validate');
const readfile = require('../src/readfile');
const parsejson = require('../src/parsejson');

test('validator should fail with wrong params', async () => {
    let res = validate({}, {});
    await expect(res[0]).toEqual("The provided schema or config is empty");
});
test('validator should pass', async () => {
    let res = validate(parsejson(readfile('./test/test-files/config.json')), parsejson(readfile('./test/test-files/valid-config.json')));
    await expect(res.length).toEqual(0);
});
