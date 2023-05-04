import { createContext, useReducer } from 'react'

export const InvoiceContext = createContext()

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INVOICES':
      return {
        invoices: action.payload,
      }
    case 'CREATE_INVOICES':
      return {
        invoices: [action.payload, ...state.invoices],
      }
    case 'DELETE_INVOICES':
      return {
        invoices: state.invoices.filter((w) => w.invoiceid !== action.payload.invoiceid),
      }
    default:
      return state
  }
}

export const InvoiceContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoiceReducer, {
    invoices: null,
  })

  return (
    <InvoiceContext.Provider value={{ ...state, dispatch }}>{children}</InvoiceContext.Provider>
  )
}