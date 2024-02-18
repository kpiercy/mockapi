import { createContext, useReducer } from 'react'

export const ReturnLogContext = createContext()

export const logReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGS':
            return {
                logs: action.payload,
            }
        case 'CREATE_LOGS':
            return {
                logs: [action.payload, ...state.logs],
            }
        case 'DELETE_LOGS':
            return {
                logs: state.logs.filter(
                    (w) => w.logid !== action.payload.logid
                ),
            }
        default:
            return state
    }
}

export const ReturnLogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(logReducer, {
        logs: null,
    })

    return (
        <ReturnLogContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ReturnLogContext.Provider>
    )
}
