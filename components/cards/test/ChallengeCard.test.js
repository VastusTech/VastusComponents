import React from 'react';
import ChallengeCard from "../ChallengeCard";
import { shallow, mount } from 'enzyme';
import TestConfig, {store} from "../../../../TestConfig";
import {Card} from "semantic-ui-react/dist/commonjs/views/Card/Card";

describe('ChallengeCard.js', function () {
    beforeAll(() => {
        TestConfig();
    });

    it('renders without crashing', () => {
        const component = shallow(<ChallengeCard store={store()} challengeID={null}/>);
        expect(component).toMatchSnapshot()
    });

    it('displays correct title', () => {
        const name = getChallengeAttribute("title");
    });

});