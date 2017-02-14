var React  = require('react');
var TopBar = require('../components/TopBar');
var request = require('superagent');
var Login = React.createClass({
  getInitialState:function(){
    return {
      username:"",
      password:""
    };
  },
  login:function(){
    request.post(serverName + "Auth/Login/")
    .set({'content-type':"application/x-www-form-urlencoded"})
    .send({NAME:this.state.username,PASSWORD:this.state.password})
    .end((err,res)=>{
      if(res.body.error == false){
        token = res.body.msg.token;
        this.props.router.replaceHistory("/indexdash");
      }
      else{
        alert("The username or password you have entered is incorrect. Please try again")
      }
    })
  },
  textChange:function(name, e){
    
    var value = e.currentTarget.value;
    this.setState({[name]:value})
  },
  render:function(){
    return(
    <div id="Login" className="ui form" style={{textAlign:"center", display:"inlineBlock", position:"relative"}}>
      <div id="field" className="field">
        Enter your username:
        <input value={this.state.username} onChange={this.textChange.bind(this,"username")} type="text" />
      </div>
        <br></br>
        <br></br>
        <div id="field" className="field">
        Enter your password:
        <input value={this.state.password} onChange={this.textChange.bind(this,"password")} type="password" />
      </div>
        <br></br>
        <button className="ui primary submit button" onClick={this.login} >Sign in</button>
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
