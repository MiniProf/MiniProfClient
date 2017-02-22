var React = require('react');
var Router = React.createClass({
  getInitialState:function(){
    this.props.router.origin = this;
    //should call router.goBack() when the backbutton on the phone is pressed
    document.addEventListener("backbutton", this.props.router.goBack, false);
    return {};
  },
  render:function(){
    var page;
    this.props.children.map((child)=>{
      if(child.props.path == this.props.router.path)
        page = child;
    });
    return page;
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
module.exports = {Router:Router,router:router};
