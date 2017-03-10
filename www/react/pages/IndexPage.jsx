var React  = require('react');
var TopBar = require('../components/TopBar');
var IndexPage = React.createClass({
  getInitialState:()=>{
    history.pushState(null,null,location.href);
    window.onpopstate = function (event) {
      //history.go(1);
    };
    return {};
  },
  render:function(){
    if(topbar)
      topbar.forceUpdate();
      debugger;
    return(<div id="IndexPage" className="page">
        <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/CreateSessionPage");}}>Create New Session</button>
        <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/ReviewResponses");}}>View Session History</button>
        {/* <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/login");}}>login</button>
        <button className="ui button fluid homeButton" onClick={()=>{this.context.router.push("/seshDashboard");}}>seshDashboard</button> */}
    </div>)
  }
});
module.exports = IndexPage;
