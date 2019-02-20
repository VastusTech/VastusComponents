import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import Spinner from "../Spinner";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<Spinner loading={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});
