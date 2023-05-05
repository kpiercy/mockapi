import { createContext, useReducer } from 'react'

export const ProcessContext = createContext()

export const processReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROCESSES':
            return {
                processs: action.payload,
            }
        case 'CREATE_PROCESSES':
            return {
                processs: [action.payload, ...state.processs],
            }
        case 'DELETE_PROCESSES':
            return {
                processs: state.processs.filter(
                    (w) => w.processid !== action.payload.processid
                ),
            }
        default:
            return state
    }
}

export const ProcessContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(processReducer, {
        processs: null,
    })

    return (
        <ProcessContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProcessContext.Provider>
    )
}
