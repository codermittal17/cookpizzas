import { FaHeart } from "react-icons/fa"

function Pizza({ pizza, OnToggleTypeOfBox, onClickAddToFavouriteBtn, favouritePizzasList }) {
    const { title, image_url, recipe_id: id } = pizza;
    return (
        <li className="pizza">
            <FaHeart
                className={`add-to-favourite-icon ${favouritePizzasList.some((item) => item.recipe_id === id) ? `favourite` : ``}`}
                onClick={() => onClickAddToFavouriteBtn(pizza)}
            />
            <img src={image_url} alt="pizzaImage" className="pizza-item-image" />


            <div className="pizza-item-info">
                <h5 className="pizza-item-title">{title}</h5>
                <p className="recipe" onClick={() => { OnToggleTypeOfBox("recipe") }}>See Recipe</p>
            </div>
        </li>
    )
}

export default Pizza
