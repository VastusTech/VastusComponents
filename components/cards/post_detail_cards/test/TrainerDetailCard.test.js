import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../../TestConfig";
import TrainerDetailCard from "../TrainerDetailCard";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<TrainerDetailCard postID={null} store={store()}/>);
    expect(component).toMatchSnapshot();
});
