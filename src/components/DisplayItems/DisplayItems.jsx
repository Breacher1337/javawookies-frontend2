import { useContext } from 'react';
import AppContext from "../../context/AppContext.jsx";
import Item from '../Item/Item.jsx';

const DisplayItems = ({selectedCategory}) => {

    const {itemsData} = useContext(AppContext);

    const filteredItems = itemsData.filter(item => {
        if (!selectedCategory) return true;
        return item.categoryId === selectedCategory;
    });

    return (
        <div className='p-3'>
            <div className="d-flex align-items-center mb-4" id='items-ct'>
                <div className='coffee-title'>Javawookies</div>
            </div>
            <div className="row g-3">
                {filteredItems.map((item, index) => (
                    <div key={index} className='col-md-3 col-sm-6'>
                        <Item
                            itemName={item.name}
                            itemPrice={item.price}
                            itemImage={item.imageUrl}
                            itemId={item.itemId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default DisplayItems;