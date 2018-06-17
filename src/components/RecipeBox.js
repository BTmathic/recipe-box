import React from 'react';
import Recipes from './Recipes';
import AddEditModal from './AddEditModal';

export default class RecipeBox extends React.Component {
    state = {
        recipeList: [
            [
                'Savoury Oats',
                'A savoury take on the simple classic',
                [
                    '1/2 cup oats',
                    '1/2 grated carrot or (cooked) beet',
                    '3/4 cup water',
                    '1/4 cup salsa',
                    '1 cup chopped kale',
                    '1/2 avocado chopped',
                    '1 Tbsp pumpkin seeds',
                    'Smoked paprika'
                ],
                [
                    'Combine oats and carrot (or beet) with water in a hot pot and simmer for 5 minutes',
                    'Add salsa and kale and heat through until kale is soft',
                    'Serve topped with the rest'
                ]
            ],
            [
                'Shanghai-style Noodles',
                'Quick and easy to prepare, loaded with veggies for a healthy dish',
                [
                    '2 Tbsp sesame oil',
                    'Noodles',
                    '1 medium onion diced',
                    '2-3 cloves garlic, diced',
                    '1/2 thumb ginger',
                    '200-250g tempeh cut into 1/2 inch by 1 inch pieces',
                    '1 medium carrot grated or finely diced',
                    '2 bell peppers finely diced',
                    '1 hot pepper (as hot as you like)',
                    '2-3 stalks of green onion diced'
                ],
                [
                    'Boil water for noodles and cook as per package instructions',
                    'Heat wok with 1 Tbsp of oil',
                    'Add garlic/ginger and onion when wok is hot',
                    'Add tempeh once onion is translucent',
                    'Add peppers and carrot and stir',
                    'Cook on medium-high heat for 5-10 minutes',
                    'Remove from heat and add green onion as well as remaining sesame oil',
                    'Stir well and add noodles. Mix and serve.'
                ]
            ],
            [
                'Overnight Oats',
                'Easy to make and ready to go first thing in the morning',
                [
                    '1/2 cup steel cut oats',
                    '2 Tbsp ground flax seed',
                    '2 Tbsp chia seeds',
                    '1/2 tsp cinnamon',
                    '1/4 tsp nutmeg',
                    '1 cup water'
                ],
                [
                    'Place dry ingredients in container and mix well',
                    'Add water',
                    'Put in fridge for 4-6 hours minimum to let water absorb'
                ]
            ]
        ],
        modalIsOpen: false,
        modalRecipe: ['', '', [], [], '']
    }

    handleAddRecipe = () => {
        let recipeList = this.state.recipeList;
        recipeList.push(['', '', [], []]);
        this.setState(() => ({ recipeList }));
        this.handleLoadModalRecipe('', '', [''], [''], recipeList.length-1);
    }

    handleCancelAddRecipe = () => {
        if (this.state.modalRecipe[0] === '') {
            let recipeList = this.state.recipeList;
            const throwaway = recipeList.pop();
            this.setState(() => ({ recipeList }));
        } // else do nothing
    }

    handleDeleteRecipe = (recipeName) => {
        this.setState((prevState) => ({
            recipeList: prevState.recipeList.filter((recipe) => recipeName !== recipe[0])
        }));
    }

    handleDuplicateTitles = (recipeName, index) => {
        let count = 1;
        for (let i=0; i < this.state.recipeList.length; i++) {
            if (i !== index) {
                if (recipeName === this.state.recipeList[i][0]) {
                    count++;
                }
            }
        }
        if (count > 1) {
            return true;
        } else {
            return false;
        }
    }

    handleEditIngredients = (ingredients, index) => {
        let recipeList = this.state.recipeList;
        recipeList[index][2] = ingredients;
        this.setState(() => ({ recipeList }));
    }

    handleEditInstructions = (instructions, index) => {
        let recipeList = this.state.recipeList;
        recipeList[index][3] = instructions;
        this.setState(() => ({ recipeList }));
    }

    handleEditSnippet = (snippet, index) => {
        let recipeList = this.state.recipeList;
        recipeList[index][1] = snippet;
        this.setState(() => ({ recipeList }));
    }

    handleEditTitle = (title, index) => {
        let recipeList = this.state.recipeList;
        recipeList[index][0] = title
        this.setState(() => ({ recipeList }));
    }

    handleLoadModalRecipe = (title, snippet, ingredients, instructions, index) => {
        this.setState(() => ({ 
            modalRecipe: [title, snippet, ingredients, instructions, index]
        }));
        this.handleToggleModal();
    }

    handleUnloadModalRecipe = () => {
        this.setState(() => ({
            modalRecipe: ['', '', [], [], '']
        }));
    }

    handleToggleModal = () => {
        const modalIsOpen = this.state.modalIsOpen;
        this.setState((prevState) => ({ modalIsOpen: !prevState.modalIsOpen }));
        if (modalIsOpen) {
            this.handleUnloadModalRecipe();
        }
    }

    componentDidMount() {
        try {
            const jsonRecipeList = localStorage.getItem('recipeList');
            const recipeList = JSON.parse(jsonRecipeList);

            if (recipeList) {
                this.setState(() => ({ recipeList }));
            }
        }

        catch (e) {
          console.log("Something went wrong...", e);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const jsonRecipeList = JSON.stringify(this.state.recipeList);
        localStorage.setItem('recipeList', jsonRecipeList);
    }

    render() {
        return (
            <div>
                <Recipes
                    error={this.state.error}
                    handleDeleteRecipe={this.handleDeleteRecipe}
                    handleDuplicateTitles={this.handleDuplicateTitles}
                    handleEditIngredients={this.handleEditIngredients}
                    handleEditInstructions={this.handleEditInstructions}
                    handleEditSnippet={this.handleEditSnippet}
                    handleEditTitle={this.handleEditTitle}
                    handleLoadModalRecipe={this.handleLoadModalRecipe}
                    handleToggleModal={this.handleToggleModal}
                    recipeList={this.state.recipeList}
                />
                <div id='add-recipe-container'>
                  <button 
                      id='add-recipe'
                      onClick={() => {this.handleAddRecipe()}}
                  >
                    Add Recipe
                  </button>
                </div>
                <AddEditModal
                    error={this.state.error}
                    handleCancelAddRecipe={this.handleCancelAddRecipe}
                    handleDuplicateTitles={this.handleDuplicateTitles}
                    handleEditIngredients={this.handleEditIngredients}
                    handleEditInstructions={this.handleEditInstructions}
                    handleEditSnippet={this.handleEditSnippet}
                    handleEditTitle={this.handleEditTitle}
                    handleToggleModal={this.handleToggleModal}
                    handleUnloadModalRecipe={this.handleUnloadModalRecipe}
                    modalIsOpen={this.state.modalIsOpen}
                    modalRecipe={this.state.modalRecipe}
                />
            </div>
        );
    }
}