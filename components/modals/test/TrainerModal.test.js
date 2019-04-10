import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import TrainerModal from "../TrainerModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<TrainerModal trainerID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

