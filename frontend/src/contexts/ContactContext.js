import { createContext, useReducer } from 'react'

export const ContactContext = createContext()

export const contactReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        contacts: action.payload,
      }
    case 'CREATE_CONTACTS':
      return {
        contacts: [action.payload, ...state.contacts],
      }
    case 'DELETE_CONTACTS':
      return {
        contacts: state.contacts.filter((w) => w.contactid !== action.payload.contactid),
      }
    default:
      return state
  }
}

export const ContactContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, {
    contacts: null,
  })

  return (
    <ContactContext.Provider value={{ ...state, dispatch }}>{children}</ContactContext.Provider>
  )
}