var React  = require('react');
var TopBar = require('../components/TopBar');
var CreateSessionPage = React.createClass({
  render:function(){
    return(
    <div id="sessionDetails">
        <br></br>
         <p style={{display:"inline-block", position:"relative"}}>Session Name:</p>
         <input type="text" placeholder="Please name the session" />
          <br></br>
          <br></br>
          <br></br>
          <input type="submit" onClick={this.props.router.goto("/seshDashboard")}/>
    </div>
    )
  }
});

module.exports = CreateSessionPage;
