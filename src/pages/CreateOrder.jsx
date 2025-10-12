import { useContext, useState } from 'react';
import DisplayCategory from "../components/DisplayCategory/DisplayCategory.jsx";
import DisplayItems from "../components/DisplayItems/DisplayItems.jsx";
import CartItems from "../components/CartItems/CartItems.jsx";
import CartSummary from "../components/CartSummary/CartSummary.jsx";
import AppContext from "../context/AppContext.jsx";
import './style/CreateCategory.css';

const CreateOrder = () => {
    const {categories} = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <div className="mt-5">
            <div className="explore-container text-dark">
                <div className="left-column">
                    <div className="first-row" style={{overflowY: 'auto'}}>
                        <DisplayCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}  categories={categories} />
                    </div>

                    <div className="second-row" style={{overflowY: 'auto'}}>
                        <DisplayItems selectedCategory={selectedCategory} />
                    </div>
                </div>
                <div className="right-column d-flex flex-column bg-white">
                    <div className="cart-items-container" style={{height: '80%', overflowY: 'auto'}}>
                        <CartItems />
                    </div>
                    <div className="cart-summary-container" style={{height: '30%'}}>
                        <CartSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateOrder;