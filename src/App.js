import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from "./Components/Transactions";
import AddTransaction from "./Components/AddTransaction";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Transactions />} />
                <Route path="/add-transaction" element={<AddTransaction />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
