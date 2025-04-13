import { FaHeart } from "react-icons/fa"

function Pizza({ pizza, favouritePizzasList, dispatch }) {
    const { title, image_url, recipe_id: id } = pizza;
    return (
        <li className="pizza">
            <FaHeart
                className={`add-to-favourite-icon ${favouritePizzasList.some((item) => item.recipe_id === id) ? `favourite` : ``}`}
                onClick={() => dispatch({ type: "AddToFavourite", payload: pizza })}
            />
            <img src={image_url} alt="pizzaImage" className="pizza-item-image" />


            <div className="pizza-item-info">
                <h5 className="pizza-item-title">{title}</h5>
                <p className="recipe" onClick={() => {
                    dispatch({ type: 'SELECT_PIZZA', payload: { typeOfBox: "recipe", recipe_id: pizza.recipe_id } });
                }}>See Recipe</p>
            </div>
        </li>
    )
}

export default Pizza
