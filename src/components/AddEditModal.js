import React from 'react';
import Modal from 'react-modal';

export default class AddEditModal extends React.Component {
    state = {
        title: '',
        snippet: '',
        ingredients: '',
        instructions: '',
        index: '',
        error: undefined
    }
    
    // Directly submitting the form is not allowed because the form is
    // not attached to the body, so instead of submitting to collect the
    // new title we store the edit in the component state and can submit
    // the value in the state to catch edits when closing the modal 
    handleChangeTitle = (e) => {
        const update = e.target.value;
        this.setState(() => ({ title: update }));
    }

    handleChangeSnippet = (e) => {
        const update = e.target.value;
        this.setState(() => ({ snippet: update }));
    }

    handleChangeIngredients = (e) => {
        let update = e.target.value;
        update = update.split(",");
        this.setState(() => ({ ingredients: update }));
    }

    handleChangeInstructions = (e) => {
        let update = e.target.value;
        update = update.split(",");
        this.setState(() => ({ instructions: update }));
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.handleCancelAddRecipe();
        this.setState(() => ({
            title: '',
            snippet: '',
            ingredients: [],
            instructions: [],
            error: undefined
        }));
        this.props.handleToggleModal();
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.title === '') {
            this.setState(() => ({ error: 'Please enter a valid recipe name' }));
        } else {
            if (this.props.handleDuplicateTitles(this.state.title, this.state.index)) {
                this.setState(() => ({ error: 'Another recipe already uses that name.'}));
            } else {
                this.setState(() => ({ error: undefined }));
                this.props.handleEditTitle(this.state.title, this.state.index);
                this.props.handleEditSnippet(this.state.snippet, this.state.index);
                this.props.handleEditIngredients(this.state.ingredients, this.state.index);
                this.props.handleEditInstructions(this.state.instructions, this.state.index);
                this.props.handleUnloadModalRecipe();
                this.setState(() => ({
                    title: '',
                    snippet: '',
                    ingredients: [],
                    instructions: []
                }));
                this.props.handleToggleModal();
            }
        }
    }

    componentDidMount() {
        this.setState(() => ({
            title: this.props.modalRecipe[0],
            snippet: this.props.modalRecipe[1],
            ingredients: this.props.modalRecipe[2],
            instructions: this.props.modalRecipe[3]
        }));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.modalRecipe[0] !== nextProps.modalRecipe[0]) {
            this.setState(() => ({ title: nextProps.modalRecipe[0] }));
        } if (this.props.modalRecipe[1] !== nextProps.modalRecipe[1]) {
            this.setState(() => ({ snippet: nextProps.modalRecipe[1] }));
        } if (this.props.modalRecipe[2] !== nextProps.modalRecipe[2]) {
            this.setState(() => ({ ingredients: nextProps.modalRecipe[2] }));
        } if (this.props.modalRecipe[3] !== nextProps.modalRecipe[3]) {
            this.setState(() => ({ instructions: nextProps.modalRecipe[3] }));
        } if (this.props.modalRecipe[4] !== nextProps.modalRecipe[4]) {
            this.setState(() => ({ index: nextProps.modalRecipe[4] }));
        } if (!!this.props.error) {
            this.setState(() => ({ error: 'Please submit a valid recipe title' }))
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.handleToggleModal}
                shouldCloseOnOverlayClick={false}
                contentLabel='Edit Recipe'
                closeTimoutMS={200}
                className='modal'
            >
                <h3 className='modal_title'>Edit {this.state.title} Recipe</h3>
                {<form>
                    <label>Title</label>
                    {this.state.error && <span className='error'>{this.state.error}</span>}
                    <input
                        type='text'
                        onChange={this.handleChangeTitle}
                        className='modal__title'
                        name='title'
                        value={this.state.title}
                    />
                    <label>Snippet</label>
                    <input
                        type='text'
                        onChange={this.handleChangeSnippet}
                        className='modal__snippet'
                        name='snippet'
                        value={this.state.snippet}
                    />
                    <label>Ingredients</label>
                    <textarea
                        cols='55'
                        rows='4'
                        onChange={this.handleChangeIngredients}
                        //onInput={this.handleChangeIngredients}
                        className='modal__ingredients'
                        name='ingredients'
                        value={this.state.ingredients}
                    />
                    <label>Instructions</label>
                    <textarea
                        cols="55"
                        rows="4"
                        onChange={this.handleChangeInstructions}
                        //onInput={this.handleChangeInstructions}
                        className='modal__instructions'
                        name='instructions'
                        value={this.state.instructions}
                    />
                    <div className='modal-buttons'>
                        <button
                            className='submit-button'
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            className='cancel-button'
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>}
            </Modal>
        );
    }
}