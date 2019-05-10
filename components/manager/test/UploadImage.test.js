import "../../../testing/SetTesting";
import React from 'react';
import { shallow } from 'enzyme';
import { store, funCompWrapper } from "../../../testing/TestHelper";
import {expect} from "chai";
import UploadImage from "../UploadImage";
import AvatarEditor from "react-avatar-editor";

it('renders without crashing', () => {
    const component = shallow(<UploadImage callback={() => {}} imageURL={null} store={store()}/>);
    global.expect(component).toMatchSnapshot();
});

describe("Upload Image", () => {
    describe("State", () => {
        it('Contains avatar editor', () => {
            const component = shallow(<UploadImage callback={() => {}} imageURL={null} store={store()}/>);

            expect(component.find(AvatarEditor)).to.have.lengthOf(1);
        });

        it('Contains three buttons', () => {
            const component = shallow(<UploadImage callback={() => {}} imageURL={null} store={store()}/>);

            expect(component.find("Button")).to.have.lengthOf(3);
        });
    });
});
