import React from "react";
import {Message, Icon} from "semantic-ui-react";

type Props = {
  loading: boolean
}

/**
 * The loading spinner to show a process loading.
 *
 * @param {Props} props The props passed into the component.
 * @return {*} The React JSX to display the component.
 * @constructor
 */
const Spinner = (props: Props) => {
  if (props.loading) {
    return (
      <Message icon>
        <Icon name='spinner' size="small" loading/>
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
