var React  = require('react');
var TopBar = require('../components/TopBar');
var Login = React.createClass({
  render:function(){
    return(
    <div id="Login" className="ui form" style={{textAlign:"center", display:"inlineBlock", position:"relative"}}>
      <div id="field" className="field">
        Enter your username:
        <input type="text" />
      </div>
        <br></br>
        <br></br>
        <div id="field" className="field">
        Enter your password:
        <input type="text" />
      </div>
        <br></br>
        <button className="ui button" type="submit" style={{backgroundColor:"#3366FF"}}>Sign in</button>
        <br></br>
        <br></br>
        <a>Click here</a> to reset your username or password
        <br></br>
        Not registered? <a onClick={()=>{this.props.router.goto("/Register");}}>Click here</a> to register
    </div>
    )
  }
});
module.exports = Login;
