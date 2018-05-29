import React from 'react';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

import {withUserObject} from './ObjectStore'

const NotesPure = ({
  userObject,
  addUserObjectMutation,
  clearUserObjectMutation,
}) => (
  <div>
  <h1>User object test</h1>
  <div>{userObject.name}</div>
    <div>
      <input type='submit' value='Add' onClick={(e) => {
        addUserObjectMutation({variables: {item: {
          'name': 'notben',
          'email': 'notben@email.com',
        }}});
      }} />
      <input type='submit' value='Clear' onClick={(e) => clearUserObjectMutation()} />
    </div>
  </div>);

const Notes = compose(
  withUserObject,
)(NotesPure);

export default Notes;
