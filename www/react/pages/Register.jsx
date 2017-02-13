var React  = require('react');
var TopBar = require('../components/TopBar');
var Register = React.createClass({
  getInitialState:function(){
    return {
      name:"",
      password:"",
      uni:""
    };
  },
  register:function(){
    request.get(serverName + "Auth/Register/")
    .send({NAME:this.state.username,UNI:this.state.uni,PASSWORD:this.state.password})
    .end((err,res)=>{
      if(res.body.error == false){
        alert("You have successfully been registered")
        {/*insert code for automatically logging the user in if they are registered*/}
      }
      else{
        alert("Registration unsuccessful!\nPlease try again")
      }
    })
  },
  render:function(){
    return(
      <div id="register">
        <form className="ui form segment">
        <div className="field">
          <label>Full Name: </label>
          <input value={this.state.name} name="name" type="text" />
          </div>
          <div className="field">
            <label>Password</label>
            <input value={this.state.password} type="password" name="PASSWORD" />
          </div>
        <div className="field">
          <label>Please select an institution: </label>
          <select value={this.state.uni} name="UNI" className="fluid ui dropdown">
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
        <div className="ui primary submit button">Register</div>
          <div className="ui error message"></div>
        </form>
    </div>
    )
  }
});
module.exports = Register;
