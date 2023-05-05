import { createContext, useReducer } from 'react'

export const FacilityContext = createContext()

export const facilityReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FACILITIES':
            return {
                facilities: action.payload,
            }
        case 'CREATE_FACILITIES':
            return {
                facilities: [action.payload, ...state.facilities],
            }
        case 'DELETE_FACILITIES':
            return {
                facilities: state.facilities.filter(
                    (w) => w.facilityid !== action.payload.facilityid
                ),
            }
        default:
            return state
    }
}

export const FacilityContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(facilityReducer, {
        facilities: null,
    })

    return (
        <FacilityContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FacilityContext.Provider>
    )
}
