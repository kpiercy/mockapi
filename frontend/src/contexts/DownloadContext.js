import { createContext, useReducer } from 'react'

export const DownloadContext = createContext()

export const downloadReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DOWNLOADS':
      return {
        downloads: action.payload,
      }
    case 'CREATE_DOWNLOADS':
      return {
        downloads: [action.payload, ...state.downloads],
      }
    case 'DELETE_DOWNLOADS':
      return {
        downloads: state.downloads.filter((w) => w.downloadid !== action.payload.downloadid),
      }
    default:
      return state
  }
}

export const DownloadContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(downloadReducer, {
    downloads: null,
  })

  return (
    <DownloadContext.Provider value={{ ...state, dispatch }}>{children}</DownloadContext.Provider>
  )
}