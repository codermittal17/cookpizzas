import { useEffect, useState } from "react";

import Navbar from "./Navbar"
import Main from "./Main"
import Menu from "./Menu"
import Recipe from "./Recipe"
import Favourites from "./Favourites"
import Pizza from "./Pizza";
import FullPageLoader from "./FullPageLoader";

const pizzaData = [
  {
    "title": "Best Pizza Dough Ever",
    "recipe_id": "47746",
    "image_url": "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
  },
  {
    "title": "Deep Dish Fruit Pizza",
    "recipe_id": "46956",
    "image_url": "http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg"
  },
  {
    "title": "Pizza Dip",
    "recipe_id": "35477",
    "image_url": "http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg"
  },
  {
    "title": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
    "recipe_id": "41470",
    "image_url": "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg"
  },
]

function App() {
  const [favouritePizzasList, setfavouritePizzasList] = useState([]);
  const [typeOfBox, setTypeOfBox] = useState("menu");
  const [pizzaData, setPizzaData] = useState([]);
  const [selectedPizzaId, setSelectedPizzaId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const numFavPizzas = favouritePizzasList.length;

  function handleTypeOfBoxToggle(type) {
    setTypeOfBox((typeOfBox) => typeOfBox === type ? "menu" : type);
  }

  function handlePizzaSelection(pizza){
    setSelectedPizzaId(pizza.recipe_id);
  }



  function handleAddToFavouriteBtn(pizzaObj) {
    favouritePizzasList.some((pizza) => pizza.recipe_id === pizzaObj.recipe_id)
      ? setfavouritePizzasList((pizza) => pizza.filter((item) => item.recipe_id !== pizzaObj.recipe_id)) :
      setfavouritePizzasList((pizza) => [...pizza, pizzaObj])
  }

  useEffect(function () {
    async function getPizzaData() {
      try {
        setIsLoading(true);

        const res = await fetch('https://forkify-api.herokuapp.com/api/search?q=pizza');

        if (!res.ok) throw new Error("Network Related Issue");

        const data = await res.json();
        setPizzaData(data.recipes);
      }
      catch (error) {
        // console.error(`Error: ${error.message}`);
      }
      finally {
        setIsLoading(false);
      }
    }

    getPizzaData();
  }, [])

  return (
    <>
      {
        isLoading ? <FullPageLoader /> :
      <>
      <Navbar numFavPizzas={numFavPizzas} OnToggleTypeOfBox={handleTypeOfBoxToggle} />
      <Main>
        <div className="main">
          <h3>
            {
              typeOfBox === "menu" && "Learn and Cook Delicious Pizza"
            }
            {
              typeOfBox === "recipe" && "Recipe"
            }
          </h3>

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

              numFavPizzas === 0 ? <p>You have no favourite pizzas</p> : <Favourites>
                <ul className="pizzas-list">
                  {
                    favouritePizzasList.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} onClickAddToFavouriteBtn={handleAddToFavouriteBtn} favouritePizzasList={favouritePizzasList} />)
                  }
                </ul>
              </Favourites>

            )
          }
        </div>
      </Main>
      </>
      }
    </>
  )
}

export default App
