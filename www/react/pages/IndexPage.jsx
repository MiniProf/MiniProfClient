var React  = require('react');
var TopBar = require('../components/TopBar');
var IndexPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  render:function(){
    return(<div id="IndexPage" className="page">
      <a onClick={()=>{this.props.router.goto("/CreateSessionPage");}}>
        <button className="ui button fluid homeButton">Create Session</button>
      </a>
      <a onClick={()=>{this.props.router.goto("/StartPollPage");}}>
        <button className="ui button fluid homeButton">Start Poll</button>
      </a>
      <a onClick={()=>{this.props.router.goto("/ReviewResponses");}}>
        <button className="ui button fluid homeButton">View Feedback</button>
      </a>
    </div>)
  }
});
module.exports = IndexPage;
