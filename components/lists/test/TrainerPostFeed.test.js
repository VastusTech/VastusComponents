import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import {store} from "../../../testing/TestHelper";
import TrainerPostFeed from "../TrainerPostFeed";

it('renders without crashing', () => {
    const component = shallow(<TrainerPostFeed store={store()} trainerID={null}/>);
    expect(component).toMatchSnapshot();
});
