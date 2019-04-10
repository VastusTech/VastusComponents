import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import CreateChallenge from "../CreateChallenge";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<CreateChallenge store={store()}/>);
    expect(component).toMatchSnapshot();
});
