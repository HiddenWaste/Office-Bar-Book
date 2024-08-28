import React from 'react';

// DrinkSlide Component
// Props: drink - an object containing drink details (image, name, price, recipe)
const DrinkSlide = ({ drink }) => {
    return (
        <div className="drink-slide">
            <img src={drink.img_path} alt={drink.name} className="drink-image" />
            <div className="drink-details">
                <h2>{drink.name}</h2>
                <p className="price">{drink.price}</p>
                <pre className="recipe">{drink.recipe}</pre>
            </div>
        </div>
    );
};

export default DrinkSlide;
