import React from 'react';
import { Provider } from "react-redux";
import { shallow, mount } from 'enzyme';
import TrainerCard from "../TrainerCard";
import TestConfig, {store} from "../../../../TestConfig";

TestConfig();
it('renders without crashing', () => {
    const component = shallow(<TrainerCard store={store()} rank={1} trainerID={null}/>);
    expect(component).toMatchSnapshot();
});
