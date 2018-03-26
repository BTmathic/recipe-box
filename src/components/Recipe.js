import React from 'react';
import TitleBar from './TitleBar';
import SnippetBar from './SnippetBar';
import IngredientList from './IngredientList';
import InstructionList from './InstructionList';

export default class Recipe extends React.Component {
    state = {
        visible: true
    }

    handleVisibilityToggle = (visible) => {
        this.setState(() => ({ visible }));
    }

    render() {
        return (
            <div className='recipe'>
                <TitleBar
                    index={this.props.index}
                    recipe={this.props.recipe}
                    visible={this.state.visible}
                    handleDuplicateTitles={this.props.handleDuplicateTitles}
                    handleEditTitle={this.props.handleEditTitle}
                    handleLoadModalRecipe={this.props.handleLoadModalRecipe}
                    handleToggleModal={this.props.handleToggleModal}
                    handleVisibilityToggle={this.handleVisibilityToggle}
                />
                {this.state.visible &&
                    <div className='recipe-contents'>
                        <SnippetBar
                            index={this.props.index}
                            recipeSnippet={this.props.recipe[1]}
                            recipeName={this.props.recipe[0]}
                            handleEditSnippet={this.props.handleEditSnippet}
                            handleDeleteRecipe={this.props.handleDeleteRecipe}
                        />
                        <div className='flex-panel'>
                            <IngredientList
                                index={this.props.index}
                                ingredients={this.props.recipe[2]}
                                handleEditIngredients={this.props.handleEditIngredients}
                            />
                            <InstructionList
                                index={this.props.index}
                                instructions={this.props.recipe[3]}
                                handleEditInstructions={this.props.handleEditInstructions}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}