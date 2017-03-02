var React = require('react');
var { Router, Route, Link, browserHistory } = require('react-router')
var RRouter = React.createClass({
  getInitialState:function(){
    //should call router.goBack() when the backbutton on the phone is pressed
    console.log(browserHistory);
    return {};
  },
  render:function(){
    /*var page;
    this.props.children.map((child)=>{
      if(child.props.path == this.props.router.path)
        page = child;
    });*/
    console.log(<Router/>);
    return (<Router history={browserHistory}>
      {this.props.children.map((child,index)=>{
        return (<Route path={child.props.path||"/"} component={child.type} key={index}/>)
      })}
    </Router>)
  }
});
var router = {
  history:[],
  path:"/",
  goto:function(newPage) {
    this.history.push(this.path);
    this.path = newPage;
    debugger;
    this.topbar.forceUpdate();
    this.origin.forceUpdate();
  },
  replaceHistory:function(newPage) {
    this.history = [];
    this.path = newPage;
    this.topbar.forceUpdate();
    this.origin.forceUpdate();
  },
  goBack:function(){
    if(this.history.length >0){
      this.path = this.history[this.history.length - 1];
      this.history.pop();
      this.topbar.forceUpdate();
      this.origin.forceUpdate();
    }
  },
  replace:function(path){
    this.path = path;
    this.history = [];
    this.topbar.forceUpdate();
    this.origin.forceUpdate();
  }

};
module.exports = {Router:RRouter,router:router};
