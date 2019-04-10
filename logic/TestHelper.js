export default class TestHelper {
    static ifTesting = false;
    static setTest() { TestHelper.ifTesting = true; }
    static unsetTest() { TestHelper.ifTesting = false; }
}