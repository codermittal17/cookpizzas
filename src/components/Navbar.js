import { LuPizza } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { usePizzas } from "../contexts/PizzaContext";
function Navbar() {
    const { numFavPizzas, dispatch } = usePizzas();

    return (
        <div className="navbar">
            <h3 className="nav-heading"><LuPizza />Cook Pizzas</h3>
            <div className="fav-icon-container" onClick={() => { dispatch({ type: "TOGGLE_TYPE", payload: "favourites" }) }}>
                <FaHeart />
                <span className="fav-pizzas-count">{numFavPizzas}</span>
            </div>
        </div>
    )
}

export default Navbar
