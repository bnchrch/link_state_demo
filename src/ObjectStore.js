import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import compose from 'recompose/compose';

/*
  Defaults
*/

const userObjectDefaults = {
  userObject: {
    'name': 'ben',
    'email': 'ben@email.com',
  },
};

/*
  GraphQL
*/

const userObjectQuery = gql`
  query GetUserObject {
    userObject @client
  }
`;

const clearUserObjectQuery = gql`
  mutation clearUserObject {
    clearUserObject @client
  }
`;

const addUserObjectQuery = gql`
  mutation addUserObject($item: String) {
    addUserObject(item: $item) @client
  }
`;

/*
  Cache Mutations
*/

const addUserObject = (_obj, {item}, {cache}) => {
  const query = userObjectQuery;

  // Update the cached userObjects
  cache.writeQuery({query, data: {userObject: item}});

  return null;
};

const clearUserObject = (_obj, _args, {cache}) => {
  cache.writeQuery({query: userObjectQuery, data: userObjectDefaults});
  return null;
};

/*
  Store
*/

/**
 * The Store object used to construct
 * Apollo Link State's Client State
*/
const store = {
  defaults: userObjectDefaults,
  mutations: {
    addUserObject,
    clearUserObject,
  },
};

/*
  Helpers
*/

const userObjectQueryHandler = {
  props: ({ownProps, data: {userObject = []}}) => ({
    ...ownProps,
    userObject,
  }),
};

const withUserObject = compose(
  graphql(userObjectQuery, userObjectQueryHandler),
  graphql(addUserObjectQuery, {name: 'addUserObjectMutation'}),
  graphql(clearUserObjectQuery, {name: 'clearUserObjectMutation'}),
);

export {
  store,
  withUserObject,
};
