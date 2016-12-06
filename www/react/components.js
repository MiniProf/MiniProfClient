var Screen = require('./Screen.jsx');
var React  = require('react');
var ReactDOM  = require('react-dom');
//console.log(React);
$(document).ready(      function(){
       ReactDOM.render(React.createElement(Screen,{}),document.body);
     });
