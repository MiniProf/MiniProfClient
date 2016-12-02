var React = require('react');
var Router = React.createClass({
  getInitialState:function(){
    this.props.router.origin = this;
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
    debugger;
    this.history.push(this.path);
    this.path = newPage;
    this.origin.forceUpdate();
  },
  goBack:function(){
    debugger;
    if(this.history.length >0){
      this.path = this.history[this.history.length - 1];
      this.history.pop();
      this.origin.forceUpdate();
    }
  },
  replace:function(path){
    this.path = path;
    this.history = [];
    this.origin.forceUpdate();
  }

};
module.exports = {Router:Router,router:router};
