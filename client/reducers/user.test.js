import { SET_USER, CLEAR_USER } from '../actions/user'
import userReducer from './user'

jest.mock('../auth0-utils')

describe('user reducer', () => {
  it('returns new user object on "SET_USER"', () => {
    const user = {
      id: 4,
      name: 'Kevin',
      email: 'kevin@example.com',
      // ha!
    }

    const oldState = {
      id: null,
      name: '',
      email: '',
    }

    const action = {
      type: SET_USER,
      user,
    }
    const newState = userReducer(oldState, action)
    expect(newState.name).toBe('Kevin')
    expect(newState).not.toBe(oldState)
  })

  it('returns default empty user object on "CLEAR_USER"', () => {
    const oldState = {
      id: 5,
      name: 'Karina',
      email: 'karina@example.com',
    }
    const action = {
      type: CLEAR_USER,
    }
    const newState = userReducer(oldState, action)
    expect(newState).not.toBe(oldState)
  })
})
