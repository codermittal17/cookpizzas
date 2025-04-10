function Pizza({ pizza }) {
    return (
        <li className="pizza">
            <div className="pizza-image-wrapper">
                <img src={pizza.image_url} alt="pizzaImage" className="pizza-item-image" />
            </div>
            <div className="pizza-item-info">
                <h5 className="pizza-item-title">{pizza.title}</h5>
                <p className="recipe">See Recipe</p>
            </div>
        </li>
    )
}

export default Pizza
