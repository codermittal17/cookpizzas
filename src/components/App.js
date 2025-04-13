import { useEffect, useReducer } from "react";

import Navbar from "./Navbar"
import Main from "./Main"
import Menu from "./Menu"
import Recipe from "./Recipe"
import Favourites from "./Favourites"
import Pizza from "./Pizza";
import FullPageLoader from "./FullPageLoader";

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

    case "SELECT_PIZZA": return { ...state, selectedPizzaId: action.payload.recipe_id, typeOfBox:action.payload.typeOfBox };

    default: throw new Error("Unknown action");
  }
}

function App() {

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

  return (
    <>
      {
        isLoading ? <FullPageLoader /> :
          <>
            <Navbar numFavPizzas={numFavPizzas} dispatch={dispatch} />
            <Main typeOfBox={typeOfBox}>
              {
                typeOfBox === "menu" && <Menu>
                  <ul className="pizzas-list">
                    {
                      pizzaData.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} favouritePizzasList={favouritePizzasList} dispatch={dispatch} />)
                    }
                  </ul>
                </Menu>
              }

              {
                typeOfBox === "recipe" && <Recipe selectedPizzaId={selectedPizzaId} dispatch={dispatch} />
              }

              {
                typeOfBox === "favourites" && (
                  <>
                    <h3>Favourites</h3>
                    <div className="back-to-menu-btn" onClick={() => dispatch({ type: "TOGGLE_TYPE", payload: "favourites" })}>
                      Go to Menu
                    </div>
                    {
                      numFavPizzas === 0 ? <p>You have no favourite pizzas</p> : <Favourites>
                        <ul className="pizzas-list">
                          {
                            favouritePizzasList.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} favouritePizzasList={favouritePizzasList} dispatch={dispatch} />)
                          }
                        </ul>
                      </Favourites>
                    }
                  </>
                )
              }
            </Main>
          </>
      }
    </>
  )
}

export default App
