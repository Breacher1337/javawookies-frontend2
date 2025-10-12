import './Category.css';

const Category = ({ categoryName, isSelected, onClick }) => {
    return (
        <div
            className="d-flex align-items-center p-3 rounded gap-1 position-relative category-hover"
            style={{
                cursor: 'pointer',
                backgroundColor: isSelected ? '#8B4513' : 'transparent'
            }}
            onClick={onClick}
        >
            <div>
                <h6
                    className='mb-0 text-sm'
                    style={{ color: isSelected ? 'white' : '#8B4513' }}
                >
                    {categoryName}
                </h6>
            </div>
            {isSelected && <div className="active-category"></div>}
        </div>
    );
};
export default Category;
