import { useState } from "react";

import Navbar from "./Navbar"
import Main from "./Main"
import Menu from "./Menu"
import Recipe from "./Recipe"
import Favourites from "./Favourites"
import Pizza from "./Pizza";

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

  function handleTypeOfBoxToggle(type) {
    setTypeOfBox((typeOfBox) => typeOfBox === type ? "menu" : type);
  }


  const numFavPizzas = favouritePizzasList.length;



  function handleAddToFavouriteBtn(pizzaObj) {
    favouritePizzasList.some((pizza) => pizza.recipe_id === pizzaObj.recipe_id)
      ? setfavouritePizzasList((pizza) => pizza.filter((item) => item.recipe_id !== pizzaObj.recipe_id)) :
      setfavouritePizzasList((pizza) => [...pizza, pizzaObj])
  }

  return (
    <>
      <Navbar numFavPizzas={numFavPizzas} OnToggleTypeOfBox={handleTypeOfBoxToggle} />
      <Main>
        <div className="main">
          <h3>Learn and Cook Delicious Pizza</h3>

          {
            typeOfBox === "menu" && <Menu>
              <ul className="pizzas-list">
                {
                  pizzaData.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} onClickAddToFavouriteBtn={handleAddToFavouriteBtn} favouritePizzasList={favouritePizzasList}  OnToggleTypeOfBox={handleTypeOfBoxToggle}  />)
                }
              </ul>
            </Menu>
          }
          {
            typeOfBox === "recipe" && <Recipe selectedPizzaId={1} OnToggleTypeOfBox={handleTypeOfBoxToggle} />
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
  )
}

export default App
