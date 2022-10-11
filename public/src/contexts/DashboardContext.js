import { createContext, useReducer } from 'react'

export const DashboardContext = createContext()

export const dashboardReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CLIENTS':
            return {
                clients: action.payload
            }
        case 'CREATE_CLIENTS':
            return {
                clients: [action.payload, ...state.clients]
            }
        case 'DELETE_CLIENTS':
            return {
                clients: state.clients.filter((w) => w.clientid !== action.payload.clientid)
            }
        default:
            return state
    }
}

export const DashboardContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dashboardReducer, {
        clients: null
    })

    return (
        <DashboardContext.Provider value={{...state, dispatch}}>
            { children }
        </DashboardContext.Provider>
    )
}