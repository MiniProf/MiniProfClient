var React  = require('react');
var TopBar = require('../components/TopBar');
var seshDashboard = React.createClass({
  render:function(){
    return(
      <a onClick={()=>{this.props.router.goto("/StartPollPage");}}>
        <button className="ui button fluid homeButton">Start Poll</button>
      </a>
    )
  }
});
module.exports = seshDashboard;
