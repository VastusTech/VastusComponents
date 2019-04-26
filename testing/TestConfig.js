import { configure } from 'enzyme';
import chai from "chai";
import Adapter from 'enzyme-adapter-react-16';
import TestHelper from "./TestHelper";

export default () => {
    chai.config.truncateThreshold = 0;
    TestHelper.setTest();
    configure({
        adapter: new Adapter()
    });
}