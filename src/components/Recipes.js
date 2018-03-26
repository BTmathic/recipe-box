import React from 'react';
import Recipe from './Recipe';

export default class Recipes extends React.Component {
    render() {
        if (this.props.recipeList.length > 0) {
            return (
                <div className='recipe-box'>
                    {this.props.recipeList.map((recipe, index) => (
                        <Recipe
                            key={recipe}
                            index={index}
                            recipe={recipe}
                            handleDeleteRecipe={this.props.handleDeleteRecipe}
                            handleDuplicateTitles={this.props.handleDuplicateTitles}
                            handleEditIngredients={this.props.handleEditIngredients}
                            handleEditInstructions={this.props.handleEditInstructions}
                            handleEditSnippet={this.props.handleEditSnippet}
                            handleEditTitle={this.props.handleEditTitle}
                            handleLoadModalRecipe={this.props.handleLoadModalRecipe}
                            handleToggleModal={this.props.handleToggleModal}
                        />
                    ))}
                </div>
                
            );
        } else {
            return (
                <div className='recipe-box'>
                    Please add a recipe!
                </div>
            );
        }
    }
}