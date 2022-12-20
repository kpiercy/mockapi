import { ClientContext } from '../contexts/ClientContext'
import { useContext } from 'react'

export const useClientContext = () => {
  const context = useContext(ClientContext)

  if (!context) {
    throw Error('useClientContext must be used inside an ClientContextProvider')
  }

  return context
}
