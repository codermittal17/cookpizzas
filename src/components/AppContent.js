import { usePizzas } from "../contexts/PizzaContext";
import FullPageLoader from "./FullPageLoader";
import Main from "./Main";
import Navbar from "./Navbar";

function AppContent() {
    const { isLoading } = usePizzas();
    if (isLoading) return <FullPageLoader />
    return <>
        <Navbar />
        <Main />
    </>
}

export default AppContent
