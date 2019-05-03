import { configure } from 'enzyme';
import chai from "chai";
import chaiExclude from "chai-exclude";
import Adapter from 'enzyme-adapter-react-16';
import TestHelper from "./TestHelper";

export default () => {
    chai.config.truncateThreshold = 0;
    chai.use(chaiExclude);
    TestHelper.setTest();
    configure({
        adapter: new Adapter()
    });
}