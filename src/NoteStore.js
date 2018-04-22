import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import compose from 'recompose/compose';

/*
  Defaults
*/

const noteDefaults = {
  savedNotes: "",
};

/*
  GraphQL
*/

const notesQuery = gql`
  query GetNotes {
    savedNotes @client
  }
`;

const clearNoteQuery = gql`
  mutation clearNote {
    clearNote @client
  }
`;

const updateNoteQuery = gql`
  mutation updateNote($text: String) {
    updateNote(text: $text) @client
  }
`;

/*
  Cache Mutations
*/

const updateNote = (_obj, {text}, {cache}) => {
  // Update the cache
  cache.writeQuery({query: notesQuery, data: {savedNotes: text}});

  return null;
};

const clearNote = (_obj, _args, {cache}) => {
  cache.writeQuery({query: notesQuery, data: noteDefaults});
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
  defaults: noteDefaults,
  mutations: {
    updateNote,
    clearNote,
  },
};

/*
  Helpers
*/

const notesQueryHandler = {
  props: ({ownProps, data: {savedNotes = ""}}) => ({
    ...ownProps,
    savedNotes,
  }),
};

const withNotes = compose(
  graphql(notesQuery, notesQueryHandler),
  graphql(updateNoteQuery, {name: 'updateNoteMutation'}),
  graphql(clearNoteQuery, {name: 'clearNoteMutation'}),
);

export {
  store,
  withNotes,
};
