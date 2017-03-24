var React  = require('react');
var TopBar = require('./components/TopBar');
var Router = require('./components/Router').Router;
var IndexPage = require('./pages/IndexPage');
var CreateSessionPage = require('./pages/CreateSessionPage');
var ReviewResponsesPage = require('./pages/ReviewResponsesPage');
var StartPollPage = require('./pages/StartPollPage');
var LoginPage = require('./pages/Login');
var SeshDashboard = require('./pages/seshDashboard');
var Register = require('./pages/Register');
var {hashHistory} = require('react-router');

var Screen = React.createClass({
  getInitialState:function(){
    if(window.localStorage.getItem("tokenCK") != null){
      return{token:window.localStorage.getItem("tokenCK")};
    }
    return{
      SessionCode:window.localStorage.getItem("sessionCode")
    };
},
componentDidMount:function(){
    if(window.localStorage.getItem("tokenCK") != null){
      router.push("/index");
    }
    else if(window.localStorage.getItem("sessionCode") != null){
        router.push("/seshDashboard");
    }
},
  logindets:function(){
    window.localStorage.setItem("tokenCK",token);
    this.setState({token:token});
  },
  seshDets:function(){
    window.localStorage.setItem("sessionCode",sessionID);
    this.setState({sessionCode:sessionID});
  },
  render:function(){
    return(
    <div>
        <TopBar history={hashHistory} path="TOPSHIZ" title="Mini-Prof"/>
        <Router browserHistory={hashHistory}>
          {/*<LoginPage path="/" router={router}/>
          <IndexPage path="/Index" router={router}/>*/}
          <IndexPage path="/index"/>
          <CreateSessionPage path="/CreateSessionPage" seshDets={this.seshDets} />
          <ReviewResponsesPage path="/ReviewResponses" />
          <StartPollPage path="/StartPollPage"/>
          <SeshDashboard path="/seshDashboard"/>
          <LoginPage path="/" logindets={this.logindets}/>
          <Register path="/Register"/>
        </Router>
      </div>);
  }
});
module.exports = Screen;
