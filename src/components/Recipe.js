import { useEffect, useState } from "react"
import FullPageLoader from "./FullPageLoader";

// const recipeData = [
//     {
//         "recipe_id": "47746",
//         "title": "Best Pizza Dough Ever",
//         "image_url": "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg",
//         "ingredients": [
//             "4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled",
//             "1 3/4 (.44 ounce) teaspoons salt",
//             "1 teaspoon (.11 ounce) instant yeast",
//             "1/4 cup (2 ounces) olive oil (optional)",
//             "1 3/4 cups (14 ounces) water, ice cold (40F)",
//             "Semolina flour OR cornmeal for dusting"
//         ]
//     }
// ]

function Recipe({ selectedPizzaId, OnToggleTypeOfBox }) {
    const [isLoading, setIsLoading] = useState(false);
    const [pizzaRecipeData, setPizzaRecipeData] = useState({});
    const {title, ingredients, image_url} = pizzaRecipeData;

    useEffect(function () {
        async function getPizzaDataById() {
            try {
                setIsLoading(true);
                console.log(selectedPizzaId);

                const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${selectedPizzaId}`);

                if (!res.ok) throw new Error("Network Related Issue");

                const data = await res.json();
                setPizzaRecipeData(data.recipe);
            }
            catch (error) {
                // console.error(`Error: ${error.message}`);
            }
            finally {
                setIsLoading(false);
            }
        }

        getPizzaDataById();
    }, [selectedPizzaId])
    return (
        <>
            {
                isLoading ? <FullPageLoader /> : <>
                    <div className="back-to-menu-btn" onClick={() => OnToggleTypeOfBox("menu")}>
                        Go to Menu
                    </div>
                    <div className="recipe-container">
                        <img src={image_url} alt="pizzaimage" />
                        <div className="pizza-description">
                            <h2>{title && title}</h2>
                            <h3>Ingidients</h3>
                            <ul>
                                {/* <li>4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled</li>
                                <li>1 3/4 (.44 ounce) teaspoons salt</li>
                                <li>1 teaspoon (.11 ounce) instant yeast</li>
                                <li>1/4 cup (2 ounces) olive oil (optional)</li>
                                <li>1 3/4 cups (14 ounces) water, ice cold (40F)</li>
                                <li>Semolina flour OR cornmeal for dusting</li> */}
                                {
                                    ingredients && ingredients.map((ingredient)=><li key={ingredient.recipe_id}>{ingredient}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Recipe
