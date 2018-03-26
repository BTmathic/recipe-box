import React from 'react';
import ReactDOM from 'react-dom';

export default class TitleBar extends React.Component {
    handleVisibilityToggle = () => {
        this.setState(() => ({ visible: !this.props.visible }),
    () => {
            this.props.handleVisibilityToggle(!this.props.visible);
        });
    }

    render() {
        return (
            <div className='title-bar' onClick={(e) => {
                if (e.target.className !== 'edit-recipe') {
                    this.handleVisibilityToggle();
                }
            }}>
                <span className='toggle'>
                    <span className='title'>
                        {this.props.recipe[0]}
                    </span>
                </span>
                {this.props.visible &&
                <button className='edit-recipe' onClick={() => {
                    this.props.handleLoadModalRecipe(
                        this.props.recipe[0],
                        this.props.recipe[1],
                        this.props.recipe[2],
                        this.props.recipe[3],
                        this.props.index
                    )}}>
                    Edit Recipe
                </button>}
            </div>
        );
    }
}