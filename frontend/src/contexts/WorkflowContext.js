import { createContext, useReducer } from 'react'

export const WorkflowContext = createContext()

export const workflowReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKFLOWS':
            return {
                workflows: action.payload,
            }
        case 'CREATE_WORKFLOWS':
            return {
                workflows: [action.payload, ...state.workflows],
            }
        case 'DELETE_WORKFLOWS':
            return {
                workflows: state.workflows.filter(
                    (w) => w.workflowid !== action.payload.workflowid
                ),
            }
        default:
            return state
    }
}

export const WorkflowContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workflowReducer, {
        workflows: null,
    })

    return (
        <WorkflowContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkflowContext.Provider>
    )
}
