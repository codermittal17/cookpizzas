function Main({ typeOfBox, children }) {
    return <div className="main">
        <h3>
            {
                typeOfBox === "menu" && "Learn and Cook Delicious Pizza"
            }
            {
                typeOfBox === "recipe" && "Recipe"
            }
        </h3>
        {children}
    </div>
}

export default Main
