import React from 'react';
import {
    gql,
    graphql
} from 'react-apollo';

import { channelsListQuery } from './ChannelsListWithData';

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

class AddChannel extends React.Component {
  constructor () {
    super()
    this.state = {
      value: ''
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.persist()
      this.props.mutate({ 
        variables: { name: this.state.value },
        refetchQueries: [ { query: channelsListQuery }]
      })
      .then( res => {
        e.target.value = '';  
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render () {
    return (
      <input
        type="text"
        placeholder="New channel"
        onKeyUp={this.handleKeyUp}
        onChange={this.handleChange}
        value={this.state.value}
      />
    )
  }
}

AddChannel = graphql(addChannelMutation)(AddChannel);
export { AddChannel };
