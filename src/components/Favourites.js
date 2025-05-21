import { usePizzas } from "../contexts/PizzaContext"
import Pizza from "./Pizza"

function Favourites() {
    const { favouritePizzasList } = usePizzas();

    return <ul className="pizzas-list">
        {
            favouritePizzasList.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} />)
        }
    </ul>
}

export default Favourites
