import React, { Component } from 'react';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

import { ApolloClient } from 'apollo-client'
import {
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

import './App.css'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory';

const networkInterface = createNetworkInterface({ 
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  networkInterface
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="navbar">React + GraphQL Tutorial</div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
