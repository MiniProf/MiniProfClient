var React  = require('react');
var TopBar = require('../components/TopBar');
var IndexPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  render:function(){
    return(<div id="IndexPage" className="page">
        <button className="ui button fluid homeButton" onClick={()=>{this.props.router.goto("/CreateSessionPage");}}>Create Session</button>
        <button className="ui button fluid homeButton" onClick={()=>{this.props.router.goto("/ReviewResponses");}}>View Feedback</button>
        {/* <button className="ui button fluid homeButton" onClick={()=>{this.props.router.goto("/login");}}>login</button>
        <button className="ui button fluid homeButton" onClick={()=>{this.props.router.goto("/seshDashboard");}}>seshDashboard</button> */}
    </div>)
  }
});
module.exports = IndexPage;
