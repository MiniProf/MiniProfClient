var React  = require('react');
var ReactDOM  = require('react-dom');

var TopBar = React.createClass({
  goBack:function(){
    this.props.router.goBack();
  },
  render:function(){
    return (<div id="TopBar" style={{height:"10vh",width:"100vw"}}>
      <i className="chevron left icon" style={{float:"left",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.goBack}></i>
      <div style={{display:"inline-block",width:"80%",float:"right",marginRight:"6%",textAlign:"center"}}>
        <img id="BofALogo" style={{height: "8vh", marginTop: "-1vh",display:"inline-block"}} src="./img/Logo.png" />
        <h2 style={{display:"inline-block",position:"relative",top:"2.5vh",fontSize:"6vh"}}>{this.props.title}</h2>
      </div>
    </div>)
  }
});
module.exports = TopBar;
