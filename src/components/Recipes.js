import React from 'react';
import Recipe from './Recipe';

const Recipes = (props) => {
    if (props.recipeList.length > 0) {
        return (
            <div id='recipe-box'>
                {props.recipeList.map((recipe, index) => (
                    <Recipe
                        key={recipe}
                        index={index}
                        recipe={recipe}
                        handleDeleteRecipe={props.handleDeleteRecipe}
                        handleDuplicateTitles={props.handleDuplicateTitles}
                        handleEditIngredients={props.handleEditIngredients}
                        handleEditInstructions={props.handleEditInstructions}
                        handleEditSnippet={props.handleEditSnippet}
                        handleEditTitle={props.handleEditTitle}
                        handleLoadModalRecipe={props.handleLoadModalRecipe}
                        handleToggleModal={props.handleToggleModal}
                    />
                ))}
            </div>
        );
    } else {
        return (
            <div id='recipe-box'>
                Please add a recipe!
            </div>
        );
    }
}

export default Recipes;