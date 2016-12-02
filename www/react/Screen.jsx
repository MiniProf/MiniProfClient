var React  = require('react');
var TopBar = require('./components/TopBar');
var Router = require('./components/Router').Router;
var router = require('./components/Router').router;
var IndexPage = require('./pages/IndexPage');
var SearchPage = require('./pages/SearchPage');
var FloorPlanPage = require('./pages/FloorPlanPage');
var DateTime = require('./pages/DateTimePage');
var FindPerson = require('./pages/FindPerson');
var ProfilePage = require('./pages/ProfilePage');
import mat from 'material-ui/Avatar';
var HelpPage = require('./pages/HelpPage');

const Screen = () =>(
  <div>
      <TopBar router={router} title="Hot Potato"/>
      <Router router={router}>
        <IndexPage path="/" router={router}/>
        <SearchPage path="/search" router={router}/>
        <FloorPlanPage path="/floor" router={router}/>
        <DateTime path="/datetime" router={router}/>
        <FindPerson path="/findperson" router={router}/>
        <ProfilePage path="/profile" router={router}/>
        <HelpPage path="/help" router={router}/>
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
