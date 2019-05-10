import { configure } from 'enzyme';
import chai from "chai";
import chaiExclude from "chai-exclude";
import Adapter from 'enzyme-adapter-react-16';
import TestHelper from "./TestHelper";
import {setLog, setErr} from "../../Constants";

export default () => {
    chai.config.truncateThreshold = 0;
    chai.use(chaiExclude);
    TestHelper.setTest();
    configure({
        adapter: new Adapter()
    });
    setLog(false);
    setErr(false);
}