var React  = require('react');
var TopBar = require('../components/TopBar');
var IndexPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  render:function(){
    return(<div id="IndexPage" className="page">
      <a onClick={()=>{this.props.router.goto("/CreateSessionPage");}}>
        <button className="ui button fluid homeButton">Create session</button>
      </a>
      <a onClick={()=>{this.props.router.goto("/StartPollPage");}}>
        <button className="ui button fluid homeButton">Start poll</button>
      </a>
      <a onClick={()=>{this.props.router.goto("/pReviewPage");}}>
        <button className="ui button fluid homeButton">Review poll results</button>
      </a>
    </div>)
  }
});
module.exports = IndexPage;
