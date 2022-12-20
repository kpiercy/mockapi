import { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const userReducer = (state, action) => {
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

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: null,
  })

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>{children}</UserContext.Provider>
  )
}
