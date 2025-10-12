import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import ViewOrders from "./pages/ViewOrders.jsx";
import CreateOrder from "./pages/CreateOrder.jsx";
import History from "./pages/History.jsx";
import Home from "./pages/Home.jsx";
import Menubar from "./components/Menubar/Menubar.jsx";

const App = () => {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Menubar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/orders" element={<ViewOrders />} />
                    <Route path="/orders/new" element={<CreateOrder />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
