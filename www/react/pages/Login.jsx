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
        token = res.body.msg.Token;
        console.log(this);
        this.context.router.replace("/index")
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
    if(topbar)
      topbar.forceUpdate();
      console.log(this);
    return(
    <div id="Login" className="ui form" style={{textAlign:"center", display:"inlineBlock", position:"relative"}}>
      <div id="field" className="field">
        <br></br>
        <br></br>
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
        <a>Forgot your Username and Password?</a>
        <br></br>
        Not registered? <a onClick={()=>{this.context.router.push("/Register");}}>Register here!</a>
    </div>
    )
  }
});
module.exports = Login;
