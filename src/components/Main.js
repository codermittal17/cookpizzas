import { usePizzas } from "../contexts/PizzaContext"
import Favourites from "./Favourites"
import Menu from "./Menu"
import Recipe from "./Recipe"

function Main() {
    const { typeOfBox, numFavPizzas, dispatch } = usePizzas();
    return <div className="main">
        <h3>
            {
                typeOfBox === "menu" && "Learn and Cook Delicious Pizza"
            }
            {
                typeOfBox === "recipe" && "Recipe"
            }
        </h3>   
        {
            typeOfBox === "menu" && <Menu />
        }

        {
            typeOfBox === "recipe" && <Recipe />
        }

        {
            typeOfBox === "favourites" && (
                <>
                    <h3>Favourites</h3>
                    <div className="back-to-menu-btn" onClick={() => dispatch({ type: "TOGGLE_TYPE", payload: "favourites" })}>
                        Go to Menu
                    </div>
                    {
                        numFavPizzas === 0 ? <p>You have no favourite pizzas</p> : <Favourites />
                    }
                </>
            )
        }
    </div>
}

export default Main
