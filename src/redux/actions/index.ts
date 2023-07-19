// Coloque aqui suas actions

import { EmailState, ReduxState } from '../../types';

// ACTION TYPES
export const PUT_EMAIL = 'PUT_EMAIL';

// ACTION CREATORS

export const putEmail = (email: EmailState) => ({
  type: PUT_EMAIL,
  payload: email,
});
