var React  = require('react');
var TopBar = require('../components/TopBar');
var request = require('superagent');
var Register = React.createClass({
  getInitialState:function(){
    return {
      name:"",
      password:"",
      uni:""
    };
  },
  textChange:function(name, e){

    var value = e.currentTarget.value;
    this.setState({[name]:value})
  },
  register:function(){
    request.post(serverName + "Auth/Register/")
    .send({NAME:this.state.username,UNI:this.state.uni,PASSWORD:this.state.password})
    .end((err,res)=>{
      if(res.body.error == false){
        alert("You have successfully been registered")
        request.post(serverName + "Auth/Login/")
        .send({NAME:this.state.username,PASSWORD:this.state.password})
        .end((err,res)=>{
          if(res.body.error == false){
            token = res.body.msg.token;
            this.context.router.replace("/index");
          }
          else{
            alert("The username or password you have entered is incorrect. Please try again")
          }
        });
      }
      else{
        alert("Registration unsuccessful!\nPlease try again")
      }
    })
  },
  render:function(){
    if(topbar)
      topbar.forceUpdate();
    return(
      <div id="register">
        <form className="ui form segment">
        <div className="field">
          <label>Full Name: </label>
          <input value={this.state.name} name="name"  onChange={this.textChange.bind(this,"name")} type="text" />
          </div>
          <div className="field">
            <label>Password</label>
            <input value={this.state.password} type="password"  onChange={this.textChange.bind(this,"password")} name="PASSWORD" />
          </div>
        <div className="field">
          <label>Please select an institution: </label>
          <select value={this.state.uni} name="UNI" onChange={this.textChange.bind(this,"uni")} className="fluid ui dropdown">
            <option value="" disabled selected hidden>Please select an option</option>
            <option value="Lancaster">Lancaster University</option>
            <option value="Edgehill">Edgehill University</option>
          </select>
        </div>
        <div className="inline field">
          <div className="ui checkbox">
            <input type="checkbox" name="terms" />
            <label>I agree to the terms and conditions</label>
          </div>
        </div>
        <div className="ui primary submit button" onClick={this.register}>Register</div>
          <div className="ui error message"></div>
        </form>
    </div>
    )
  }
});
module.exports = Register;
