import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../testing/TestConfig";
import ClientList from "../ClientList";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<ClientList store={store()} clientIDs={[]} noClientsMessage={"no clients"}/>)
    expect(component).toMatchSnapshot();
});
