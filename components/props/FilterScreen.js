import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid, Checkbox, Header} from "semantic-ui-react";
import {disableType, enableType} from "../../redux_actions/searchActions";

const getCheckBoxes = (filterTypes, setFilterTypes, enableType, disableType) => {
    const checkBoxes = [];
    for (const type in filterTypes) {
        if (filterTypes.hasOwnProperty(type)) {
            checkBoxes.push(
                <div key={type}>
                    <Grid.Column>
                        <Checkbox label={type} toggle
                                  checked={filterTypes[type]}
                                  onChange={() => toggleTypeCheckbox(type, setFilterTypes, enableType, disableType)}/>
                    </Grid.Column>
                </div>
            )
        }
    }
    return checkBoxes;
};

const toggleTypeCheckbox = (type, setFilterTypes, enableType, disableType) => {
    setFilterTypes(p => {
        if (p[type]) {
            // Disable type
            disableType(type);
        }
        else {
            // Enable type
            enableType(type);
        }
        return {
            ...p,
            [type]: !p[type]
        }
    });
    // alert(JSON.stringify(event.target.checked))
};

/**
 * The Modal to filter out results from the search bar. Chooses which item types to include in the actual search
 * functionality.
 *
 * @param props The props to put into the functional component.
 * @return {*} The rendered component.
 * @constructor
 */
const FilterScreen = (props) => {
    const [filterTypes, setFilterTypes] = useState({});

    useEffect(() => {
        setFilterTypes({});
        const types = props.search.typeQueries;
        for (const type in types) {
            if (types.hasOwnProperty(type)) {
                if (["Client", "Trainer", "Event", "Challenge", "Group"].includes(type)) {
                    setFilterTypes(p => ({
                        ...p,
                        [type]: types[type].enabled
                    }));
                }
            }
        }
    }, [props.search]);

    return (
        <div>
            <Grid rows={3}>
                <Grid.Row>
                    <Header> Filter </Header>
                </Grid.Row>
                <Grid.Row>
                    Choose which item types show up in the search!
                </Grid.Row>
                <Grid.Row>
                    <Fragment>
                        <Grid stackable stretched columns={9}>
                            {getCheckBoxes(filterTypes, setFilterTypes, props.enableType, props.disableType)}
                        </Grid>
                    </Fragment>
                </Grid.Row>
            </Grid>
        </div>
    );
};

const mapStateToProps = state => ({
    search: state.search
});

const mapDispatchToProps = dispatch => {
    return {
        enableType: (type) => {
            dispatch(enableType(type));
        },
        disableType: (type) => {
            dispatch(disableType(type));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);
