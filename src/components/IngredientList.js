import React from 'react';

export default class IngredientList extends React.Component {
    state = {
        ingredients: this.props.ingredients
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.ingredients !== nextProps.ingredients) {
            this.setState(() => ({ ingredients: nextProps.ingredients }));
        }
    }

    render() {
        return (
            <div className='ingredient-list'>
                <h4>Ingredients</h4>
                <div className='panel-button-space'>
                    <ul>
                        {this.state.ingredients.map((ingredient) => (
                            <div key={ingredient} className='ingredient'>
                                <div className='bullet-point'></div>
                                {ingredient}
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}