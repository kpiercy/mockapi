import { InvoiceContext } from '../contexts/InvoiceContext'
import { useContext } from 'react'

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext)

  if (!context) {
    throw Error('useInvoiceContext must be used inside an InvoiceContextProvider')
  }

  return context
}