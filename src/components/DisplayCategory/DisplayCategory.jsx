import Category from '../Category/Category.jsx';
import './DisplayCategory.css';

const DisplayCategory = ({ selectedCategory, setSelectedCategory, categories }) => {
    return (
        <div className="d-flex gap-3 overflow-auto flex-nowrap px-3" style={{ width: '100%' }}>

            <Category
                categoryName="All"
                numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
                isSelected={selectedCategory === ""}
                onClick={() => setSelectedCategory("")}
            />

            {categories.map(category => (
                <Category
                    key={category.categoryId}
                    categoryName={category.name}
                    numberOfItems={category.items}
                    isSelected={selectedCategory === category.categoryId}
                    onClick={() => setSelectedCategory(category.categoryId)}
                />
            ))}
        </div>
    );
};

export default DisplayCategory;
