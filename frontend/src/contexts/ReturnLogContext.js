import { createContext, useReducer } from 'react'

export const ReturnLogContext = createContext()

export const returnlogReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RETURNLOGS':
            return {
                returnlogs: action.payload,
            }
        case 'CREATE_RETURNLOGS':
            return {
                returnlogs: [action.payload, ...state.returnlogs],
            }
        case 'DELETE_RETURNLOGS':
            return {
                returnlogs: state.returnlogs.filter(
                    (w) => w.returnlogid !== action.payload.returnlogid
                ),
            }
        default:
            return state
    }
}

export const ReturnLogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(returnlogReducer, {
        returnlogs: null,
    })

    returnlog (
        <ReturnLogContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ReturnLogContext.Provider>
    )
}
