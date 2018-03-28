import React from 'react';

const SnippetBar = (props) => (
    <div className='snippet-bar'>
        <span className='snippet'>
            {props.recipeSnippet}
        </span>
        <button
            className='delete-recipe'
            onClick={() => {props.handleDeleteRecipe(props.recipeName)}}
        >
            Delete Recipe
        </button>
    </div>
);

export default SnippetBar;