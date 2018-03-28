import React from 'react';

const IngredientList = (props) => (
    <div className='ingredient-list'>
        <h4>Ingredients</h4>
        <div className='panel-button-space'>
            <ul>
                {props.ingredients.map((ingredient) => (
                    <div key={ingredient} className='ingredient'>
                        <div className='bullet-point'></div>
                        {ingredient}
                    </div>
                ))}
            </ul>
        </div>
    </div>
);

export default IngredientList;