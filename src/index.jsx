import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import { Container } from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import movieApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';



//bundle index.scss through its imported file
import './index.scss';

const store = createStore(movieApp, devToolsEnhancer());

//main component
class udo_flixApplication extends React.Component {
   render() {
      return (
         <Provider store={store}>
            <Container>
               <MainView />
            </Container>
         </Provider>
      );
   }
}

//this finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

//tell react to render my app in the root DOM element
ReactDOM.render(React.createElement(udo_flixApplication), container);