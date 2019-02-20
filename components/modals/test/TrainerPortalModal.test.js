import React from 'react';
import { shallow } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import TrainerPortalModal from "../TrainerPortalModal";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<TrainerPortalModal trainerID={null} onClose={() => {}} open={true} store={store()}/>);
    expect(component).toMatchSnapshot();
});

