import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import TrainerPostFeed from "../TrainerPostFeed";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<TrainerPostFeed store={store()} trainerID={null}/>)
    expect(component).toMatchSnapshot();
});
