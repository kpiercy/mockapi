import { createContext, useReducer } from 'react'

export const ProfileContext = createContext()

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLIENTS':
      return {
        users: action.payload,
      }
    case 'CREATE_CLIENTS':
      return {
        users: [action.payload, ...state.users],
      }
    case 'DELETE_CLIENTS':
      return {
        users: state.users.filter((w) => w.clientid !== action.payload.clientid),
      }
    default:
      return state
  }
}

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, {
    users: null,
  })

  return <ProfileContext.Provider value={{ ...state, dispatch }}>{children}</ProfileContext.Provider>
}
