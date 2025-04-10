function Recipe({handleToggleShowRecipeTab, selectedPizzaId}) {
    return (
        <div>
            Recipe | {selectedPizzaId}

            <br />
            <div onClick={handleToggleShowRecipeTab}>back</div>
        </div>
    )
}

export default Recipe
