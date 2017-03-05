var React = require('react');
var { Router, Route, Link } = require('react-router')
var RRouter = React.createClass({
  getInitialState:function(){
    //should call router.goBack() when the backbutton on the phone is pressed
    return {started:false};
  },
  render:function(){
    console.log("yo");
    return (<Router history={this.props.browserHistory}>
      {this.props.children.map((child,index)=>{
        var cType = child.type;
        cType.contextTypes = {
          router: React.PropTypes.object
        };
        return (<Route path={child.props.path||"/"} component={cType} key={index}/>)
      })}
    </Router>)
  },
  componentDidUpdate:function(){

  }
});
var router = {};
module.exports = {Router:RRouter};
