import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import ClientModal from "../ClientModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ClientModal clientID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});
