import React from 'react';

export default class SnippetBar extends React.Component {

    render() {
        return (
            <div className='snippet-bar'>
                <span className='snippet'>
                    {this.props.recipeSnippet}
                </span>
                <button
                    className='delete-recipe'
                    onClick={() => {this.props.handleDeleteRecipe(this.props.recipeName)}}
                >
                    Delete Recipe
                </button>
            </div>
        );
    }
}