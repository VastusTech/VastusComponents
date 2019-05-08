import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid, Checkbox, Modal} from "semantic-ui-react";
import {disableType, enableType} from "../../redux/actions/searchActions";

/**
 * Constructs the visual checkboxes list of components using the search redux information.
 *
 * @param {{}} filterTypes The checked status of each of the filter types.
 * @param {function({})} setFilterTypes Sets the filter types state.
 * @param {function(string)} enableType Search redux function to enable a type for searching.
 * @param {function(string)} disableType Search redux function to disable a type for searching.
 * @return {[*]} The React JSX components for the check boxes.
 */
const getCheckBoxes = (filterTypes, setFilterTypes, enableType, disableType) => {
    const checkBoxes = [];
    for (const type in filterTypes) {
        if (filterTypes.hasOwnProperty(type)) {
            checkBoxes.push(
                <Grid.Column key={type}>
                    <Checkbox label={type}
                              checked={filterTypes[type]}
                              onChange={() => toggleTypeCheckbox(type, setFilterTypes, enableType, disableType)}/>
                </Grid.Column>
            )
        }
    }
    return checkBoxes;
};

/**
 * Toggles a type checkbox, based on which type is clicked.
 *
 * @param {string} type The type of the checkbox clicked.
 * @param {function({})} setFilterTypes Sets the filter types state.
 * @param {function(string)} enableType Search redux function to enable a type for searching.
 * @param {function(string)} disableType Search redux function to disable a type for searching.
 */
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
 * @param props The props passed into the component.
 * @return {*} The React JSX to display the component.
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
        <Modal.Content>
            <Grid rows={2}>
                <Grid.Row>
                    Choose which item types show up in the search!
                </Grid.Row>
                <Grid.Row>
                    <Fragment>
                        <Grid centered stackable columns={4}>
                            {getCheckBoxes(filterTypes, setFilterTypes, props.enableType, props.disableType)}
                        </Grid>
                    </Fragment>
                </Grid.Row>
            </Grid>
        </Modal.Content>
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
