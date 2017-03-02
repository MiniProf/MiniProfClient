var React = require('react');
var { Router, Route, Link, browserHistory } = require('react-router')
var RRouter = React.createClass({
  getInitialState:function(){
    //should call router.goBack() when the backbutton on the phone is pressed
    console.log(browserHistory);
    return {started:false};
  },
  render:function(){
    debugger;
    return (<Router history={browserHistory}>
      {this.props.children.map((child,index)=>{
        var cType = child.type;
        cType.contextTypes = {
          router: React.PropTypes.object
        };
        return (<Route path={child.props.path||"/"} component={cType} key={index}/>)
      })}
    </Router>)
  },
  componentDidMount:function(){
    
  }
});
var router = {};
module.exports = {Router:RRouter};
