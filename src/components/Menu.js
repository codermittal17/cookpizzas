import { usePizzas } from "../contexts/PizzaContext"
import Pizza from "./Pizza"

function Menu() {
    const { pizzaData } = usePizzas();
    return <ul className="pizzas-list">
        {
            pizzaData.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} />)
        }
    </ul>
}

export default Menu
