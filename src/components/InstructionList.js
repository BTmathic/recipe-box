import React from 'react';

export default class InstructionList extends React.Component {
    

    render() {
        return (
            <div className='instruction-list'>
                <h4>Instructions</h4>
                <ol>
                    {this.props.instructions.map((instruction, count) => (
                        <div key={instruction} className='instruction'>
                            <span className='ingredient-count'>{count+1}. </span>
                            {instruction}
                        </div>
                    ))}
                </ol>
            </div>
        );
    }
}