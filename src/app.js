import React from 'react';
import ReactDOM from 'react-dom';
import RecipeBox from './components/RecipeBox';

import 'normalize.css/normalize.css'; // reset all browser conventions
import './styles/styles.scss';

ReactDOM.render(<RecipeBox />, document.getElementById('app'));