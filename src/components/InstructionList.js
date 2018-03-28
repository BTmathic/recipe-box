import React from 'react';

const InstructionList = (props) => (
    <div className='instruction-list'>
        <h4>Instructions</h4>
        <ol>
            {props.instructions.map((instruction, count) => (
                <div key={instruction} className='instruction'>
                    <span className='ingredient-count'>{count+1}. </span>
                    {instruction}
                </div>
            ))}
        </ol>
    </div>
);

export default InstructionList;