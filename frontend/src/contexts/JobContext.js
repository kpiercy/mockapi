import { createContext, useReducer } from 'react'

export const JobContext = createContext()

export const jobReducer = (state, action) => {
  switch (action.type) {
    case 'SET_JOBS':
      return {
        jobs: action.payload,
      }
    case 'CREATE_JOBS':
      return {
        jobs: [action.payload, ...state.jobs],
      }
    case 'DELETE_JOBS':
      return {
        jobs: state.jobs.filter((w) => w.jobid !== action.payload.jobid),
      }
    default:
      return state
  }
}

export const JobContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, {
    jobs: null,
  })

  return (
    <JobContext.Provider value={{ ...state, dispatch }}>{children}</JobContext.Provider>
  )
}