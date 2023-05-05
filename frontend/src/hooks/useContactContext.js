import { ContactContext } from '../contexts/ContactContext'
import { useContext } from 'react'

export const useContactContext = () => {
  const context = useContext(ContactContext)

  if (!context) {
    throw Error('useContactContext must be used inside an ContactContextProvider')
  }

  return context
}