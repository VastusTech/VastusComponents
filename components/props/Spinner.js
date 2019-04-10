import React from "react";
import {Message, Icon} from "semantic-ui-react";

type Props = {
    loading: boolean
}

const Spinner = (props: Props) => {
    if (props.loading) {
        return (
            <Message icon>
                <Icon name='spinner' size="small" loading />
                <Message.Content>
                    <Message.Header>
                        Loading...
                    </Message.Header>
                </Message.Content>
            </Message>
        );
    }
    return null;
};

Spinner.defaultProps = {
    loading: true
};

export default Spinner;
