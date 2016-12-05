var React  = require('react');
var TopBar = require('./components/TopBar');
var Router = require('./components/Router').Router;
var router = require('./components/Router').router;
var IndexPage = require('./pages/IndexPage');
var CreateSessionPage = require('./pages/CreateSessionPage');
var PollReviewPage = require('./pages/PollReviewPage');
var StartPollPage = require('./pages/StartPollPage');


const Screen = () =>(
  <div>
      <TopBar router={router} title="Mini-Prof" title1="Teach"/>
      <Router router={router}>
        <IndexPage path="/" router={router}/>
        <CreateSessionPage path="/CreateSessionPage" router={router}/>
        <PollReviewPage path="/pReviewPage" router={router}/>
        <StartPollPage path="/StartPollPage" router={router}/>
      </Router>
      {/*
      <div className="ui top attached demo menu">
  <a  className="item">
    <i className="sidebar icon"></i>
    Menu
  </a>
</div>
<div className="ui bottom attached segment pushable">
  <div className="ui inverted labeled icon left inline vertical sidebar menu">
    <a className="item">
      <i className="home icon"></i>
    </a>
      Home
    <a className="item">
      <i className="block layout icon"></i>
      Topics
    </a>
    <a className="item">
      <i className="smile icon"></i>
      Friends
    </a>
    <a className="item">
      <i className="calendar icon"></i>
      History
    </a>
  </div>
  <div className="pusher">
    <div className="ui basic segment">
    </div>
  </div>
</div>*/}
    </div>);
    module.exports = Screen;
