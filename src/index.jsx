import React from 'react';
import ReactDOM from 'react-dom';

//bundle index.scss through its imported file
import './index.scss';

//main component
class udo_flixApplication extends React.Component{
   render(){
      return (
         <div className = 'udo-flix'>
            <div> Good morning</div>
            <p class = 'udo-flix1'>welcome to my first ever React project</p>
         </div>
      );
   }
}

//this finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

//tell react to render my app in the root DOM element
ReactDOM.render(React.createElement(udo_flixApplication), container);