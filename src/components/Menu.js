import Pizza from "./Pizza"
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
function Menu() {
    return (
        <ul className="pizzas-list">
            {
                pizzaData.map((pizzaObj) => <Pizza pizza={pizzaObj} key={pizzaObj.recipe_id} />)
            }
        </ul>
    )
}

export default Menu
