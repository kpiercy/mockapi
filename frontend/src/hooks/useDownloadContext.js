import { DownloadContext } from '../contexts/DownloadContext'
import { useContext } from 'react'

export const useDownloadContext = () => {
  const context = useContext(DownloadContext)

  if (!context) {
    throw Error('useDownloadContext must be used inside an DownloadContextProvider')
  }

  return context
}