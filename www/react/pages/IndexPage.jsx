var React  = require('react');
var TopBar = require('../components/TopBar');
var IndexPage = React.createClass({
  getInitialState:()=>{
    history.pushState(null,null,location.href);
    window.onpopstate = function (event) {
      history.go(1);
    };context
    return {};
  },
  render:function(){
    return(<div id="IndexPage" className="page">
        <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/CreateSessionPage");}}>Create Session</button>
        <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/ReviewResponses");}}>View Feedback</button>
        {/* <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/login");}}>login</button>
        <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/seshDashboard");}}>seshDashboard</button> */}
    </div>)
  }
});
module.exports = IndexPage;
