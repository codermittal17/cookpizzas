import { useEffect, useState } from "react"
import FullPageLoader from "./FullPageLoader";

function Recipe({ selectedPizzaId, dispatch }) {
    const [isLoading, setIsLoading] = useState(false);
    const [pizzaRecipeData, setPizzaRecipeData] = useState({});
    const { title, ingredients, image_url } = pizzaRecipeData;

    useEffect(function () {
        async function getPizzaDataById() {
            try {
                setIsLoading(true);

                const res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${selectedPizzaId}`);

                if (!res.ok) throw new Error("Network Related Issue");

                const data = await res.json();
                setPizzaRecipeData(data.recipe);
            }
            catch (error) {
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
                    <div className="back-to-menu-btn" onClick={() => dispatch({ type: "TOGGLE_TYPE", payload: "menu" })}>
                        Go to Menu
                    </div>
                    <div className="recipe-container">
                        <img src={image_url} alt="pizzaimage" />
                        <div className="pizza-description">
                            <h2>{title && title}</h2>
                            <h3>Ingidients</h3>
                            <ul>
                                {
                                    ingredients && ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)
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
