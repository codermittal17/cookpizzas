function Recipe({ selectedPizzaId, OnToggleTypeOfBox }) {
    return (
        <>
            <div>
                Recipe | {selectedPizzaId}
            </div>
            <div onClick={()=>OnToggleTypeOfBox("menu")}>
                Go to Menu
            </div>
        </>
    )
}

export default Recipe
