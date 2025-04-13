import { useEffect, useState } from "react";

import Navbar from "./Navbar"
import Main from "./Main"
import Menu from "./Menu"
import Recipe from "./Recipe"
import Favourites from "./Favourites"
import Pizza from "./Pizza";
import FullPageLoader from "./FullPageLoader";

function App() {
  const [favouritePizzasList, setFavouritePizzasList] = useState([]);
  const [typeOfBox, setTypeOfBox] = useState("menu");
  const [pizzaData, setPizzaData] = useState([]);
  const [selectedPizzaId, setSelectedPizzaId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const numFavPizzas = favouritePizzasList.length;

  function handleTypeOfBoxToggle(nextType) {
    setTypeOfBox((prevType) => prevType === nextType ? "menu" : nextType);
  }

  function handlePizzaSelection(pizza) {
    setSelectedPizzaId(pizza.recipe_id);
  }



  function handleAddToFavouriteBtn(pizzaObj) {
    favouritePizzasList.some((pizza) => pizza.recipe_id === pizzaObj.recipe_id)
      ? setFavouritePizzasList((pizza) => pizza.filter((item) => item.recipe_id !== pizzaObj.recipe_id)) :
      setFavouritePizzasList((pizza) => [...pizza, pizzaObj])
  }

  useEffect(function () {
    // const controller = new AbortController();
    // const signal = controller.signal;
    async function getPizzaData() {
      try {
        setIsLoading(true);

        const res = await fetch('https://forkify-api.herokuapp.com/api/search?q=pizza');

        if (!res.ok) throw new Error("Network Related Issue");

        const data = await res.json();
        setPizzaData(data.recipes);
      }
      catch (error) {
        // if (error.name === 'AbortError') {
        //   console.log('Fetch was aborted');
        //   return;
        // }
      }
      finally {
        setIsLoading(false);
      }
    }

    getPizzaData();

    // return function () {
    //   controller.abort();
    // }
  }, [])

  return (
    <>
      {
        isLoading ? <FullPageLoader /> :
          <>
            <Navbar numFavPizzas={numFavPizzas} OnToggleTypeOfBox={handleTypeOfBoxToggle} />
            <Main typeOfBox={typeOfBox}>
              {
                typeOfBox === "menu" && <Menu>
                  <ul className="pizzas-list">
                    {
                      pizzaData.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} onClickAddToFavouriteBtn={handleAddToFavouriteBtn} favouritePizzasList={favouritePizzasList} OnToggleTypeOfBox={handleTypeOfBoxToggle} onPizzaSelection={handlePizzaSelection} />)
                    }
                  </ul>
                </Menu>
              }

              {
                typeOfBox === "recipe" && <Recipe selectedPizzaId={selectedPizzaId} OnToggleTypeOfBox={handleTypeOfBoxToggle} />
              }

              {
                typeOfBox === "favourites" && (
                  <>
                    <h3>Favourites</h3>
                    <div className="back-to-menu-btn" onClick={() => handleTypeOfBoxToggle("menu")}>
                      Go to Menu
                    </div>
                    {
                      numFavPizzas === 0 ? <p>You have no favourite pizzas</p> : <Favourites>
                        <ul className="pizzas-list">
                          {
                            favouritePizzasList.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} onClickAddToFavouriteBtn={handleAddToFavouriteBtn} favouritePizzasList={favouritePizzasList} onPizzaSelection={handlePizzaSelection} OnToggleTypeOfBox={handleTypeOfBoxToggle} />)
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
