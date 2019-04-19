import React from 'react';
import { shallow, mount } from 'enzyme';
import PostCard from "../PostCard";
import TestConfig, {store} from "../../../../TestConfig";

TestConfig();
it('renders without crashing', () => {
    const reduxState = {
        cache: {
            clients: {
                CL0001: {
                    // TODO
                }
            },
            challenges: {
                CH0001: {
                    // TODO
                }
            }
        },
    };
    const post = {
        id: "PO0001",
        by: "CL0001",
        about: "CH0001"
        // TODO
    };
    const component = shallow(<PostCard post={post} store={store(reduxState)}/>);

    expect(component).toMatchSnapshot();
});
