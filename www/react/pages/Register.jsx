var React  = require('react');
var TopBar = require('../components/TopBar');
var Register = React.createClass({
  render:function(){
    return(
      <div id="register">
        <form className="ui form segment">
        <div className="field">
          <label>Full Name: </label>
          <input name="Name" type="text" />
          </div>
        <div className="field">
          <label>Please select an institution: </label>
          <select name="UNI" className="ui dropdown">
            <option value="">Please select an option</option>
            <option value="css">Lancaster University</option>
            <option value="css">Edgehill University</option>
          </select>
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" name="PASSWORD" />
        </div>
        <div className="inline field">
          <div className="ui checkbox">
            <input type="checkbox" name="terms" />
            <label>I agree to the terms and conditions</label>
          </div>
        </div>
        <div className="ui primary submit button">Register</div>
          <div className="ui error message"></div>
        </form>
    </div>
    )
  }
});
module.exports = Register;
