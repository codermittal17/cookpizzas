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
  const [showMenu, setShowMenu] = useState(true);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);


  const numFavPizzas = favouritePizzasList.length;

  function handleToggleShowRecipeTab() {
    setShowRecipe(show => !show);
    setShowMenu(false);
    setShowFavourites(false);
  }

  function handleFavouritesToggle(){
    setShowFavourites(show=>!show);
    setShowMenu(false);
    setShowRecipe(false);
  }

  function handleAddToFavouriteBtn(pizzaObj) {
    favouritePizzasList.some((pizza) => pizza.recipe_id === pizzaObj.recipe_id)
      ? setfavouritePizzasList((pizza) => pizza.filter((item) => item.recipe_id !== pizzaObj.recipe_id)) :
      setfavouritePizzasList((pizza) => [...pizza, pizzaObj])
  }

  return (
    <>
      <Navbar numFavPizzas={numFavPizzas} handleFavouritesToggle={handleFavouritesToggle} />
      <Main>
        <div className="main">
          <h3>Learn and Cook Delicious Pizza</h3>
          {
            showMenu && <Menu>
              <ul className="pizzas-list">
                {
                  pizzaData.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} onClickToggleRecipeTab={handleToggleShowRecipeTab} onClickAddToFavouriteBtn={handleAddToFavouriteBtn} favouritePizzasList={favouritePizzasList} />)
                }
              </ul>
            </Menu>
          }

          {
            showRecipe && <Recipe selectedPizzaId={1} handleToggleShowRecipeTab={handleToggleShowRecipeTab} />
          }

          {
            showFavourites && <Favourites>
              <ul className="pizzas-list">
                {
                  favouritePizzasList.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} onClickToggleRecipeTab={handleToggleShowRecipeTab} onClickAddToFavouriteBtn={handleAddToFavouriteBtn} favouritePizzasList={favouritePizzasList} />)
                }
              </ul>
            </Favourites>
          }
        </div>
      </Main>
    </>
  )
}

export default App
