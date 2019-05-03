import React from 'react';
import "../../../testing/SetTesting";
import ChallengeCard from "../ChallengeCard";
import { shallow, mount } from 'enzyme';
import { store } from "../../../testing/TestHelper";

describe('ChallengeCard.js', function () {
    it('renders without crashing', () => {
        const component = shallow(<ChallengeCard store={store()} challenge={null}/>);
        expect(component).toMatchSnapshot()
    });
});