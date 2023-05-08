import { createContext, useReducer } from 'react'

export const ReturnContext = createContext()

export const returnReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RETURNS':
            return {
                returns: action.payload,
            }
        case 'CREATE_RETURNS':
            return {
                returns: [action.payload, ...state.returns],
            }
        case 'DELETE_RETURNS':
            return {
                returns: state.returns.filter(
                    (w) => w.returnid !== action.payload.returnid
                ),
            }
        default:
            return state
    }
}

export const ReturnContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(returnReducer, {
        returns: null,
    })

    return (
        <ReturnContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ReturnContext.Provider>
    )
}
