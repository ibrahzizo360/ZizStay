import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city: undefined,
    type: undefined,
    dates: [],
    options: {
        adults: 1,
        children: 0,
        rooms: 1,
    }
}


export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state,action) => {
    switch(action.type){
        case "NEW_SEARCH": 
            return action.payload
        case "RESET_SEARCH": 
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const SearchContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);


return (
    <SearchContext.Provider value={{
        city: state.city, 
        type: state.type,
        dates: state.dates,
        options: state.options,
        dispatch}}
        >
        {children}
    </SearchContext.Provider>
)
}