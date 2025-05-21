import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    pizzaData: [],
    favouritePizzasList: [],
    selectedPizzaId: null,
    isLoading: false,
    typeOfBox: "menu"
}

function reducer(state, action) {
    switch (action.type) {
        case "Loading": return { ...state, isLoading: true };

        case "DataReceived": return { ...state, pizzaData: action.payload, isLoading: false };

        case 'TOGGLE_TYPE':
            return { ...state, typeOfBox: state.typeOfBox === action.payload ? "menu" : action.payload };

        case "AddToFavourite":
            const exists = state.favouritePizzasList.some(p => p.recipe_id === action.payload.recipe_id);
            const updatedFavourites = exists
                ? state.favouritePizzasList.filter(p => p.recipe_id !== action.payload.recipe_id)
                : [...state.favouritePizzasList, action.payload];
            return { ...state, favouritePizzasList: updatedFavourites };

        case "SELECT_PIZZA": return { ...state, selectedPizzaId: action.payload.recipe_id, typeOfBox: action.payload.typeOfBox };

        default: throw new Error("Unknown action");
    }
}

const PizzaContext = createContext();

function PizzaProvider({ children }) {

    const [{ favouritePizzasList, typeOfBox, pizzaData, selectedPizzaId, isLoading }, dispatch] = useReducer(reducer, initialState);

    const numFavPizzas = favouritePizzasList.length;

    useEffect(function () {
        async function getPizzaData() {
            try {
                dispatch({ type: 'Loading' });

                const res = await fetch('https://forkify-api.herokuapp.com/api/search?q=pizza');

                if (!res.ok) throw new Error("Network Related Issue");

                const data = await res.json();
                dispatch({ type: "DataReceived", payload: data.recipes })
            }
            catch (error) {
            }
        }

        getPizzaData();
    }, [])

    return <PizzaContext.Provider value={{
        pizzaData,
        favouritePizzasList,
        selectedPizzaId,
        isLoading,
        typeOfBox,
        numFavPizzas,
        dispatch
    }}>
        {children}
    </PizzaContext.Provider>
}


function usePizzas() {
    const context = useContext(PizzaContext);

    if (context === undefined) throw new Error("Pizzas context was used outside the PizzaProvider");

    return context;
}


export { PizzaProvider, usePizzas }