import { PizzaProvider } from "../contexts/PizzaContext";
import AppContent from "./AppContent";



function App() {
  return (
    <PizzaProvider>
      <AppContent />
    </PizzaProvider>
  )
}

export default App
