import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-client-preset';
import {ApolloClient} from 'apollo-client';
import CreateClientStore from './CreateClientStore';

// Set up Cache
const cache = new InMemoryCache();

// Set up Local State
const stateLink = CreateClientStore(cache);

// Initialize the Apollo Client
const Client = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
  ]),
  cache: cache,
});

export default Client;
