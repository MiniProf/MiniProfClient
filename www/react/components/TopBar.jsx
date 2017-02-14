var React  = require('react');
var ReactDOM  = require('react-dom');

var TopBar = React.createClass({
  goBack:function(){
    
    this.props.router.goBack();
  },
  prompt:function() {
     if (confirm("Are you sure?") == true) {
       window.token = "";
       this.forceUpdate();
         this.props.router.replaceHistory("/");
     }
 },
  render:function(){
    return (<div id="TopBar" style={{height:"10vh",width:"100vw",textAlign:"center"}}>
        <i className="chevron left icon" style={{float:"left",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.goBack}></i>
        <h2 style={{display:"inline-block",position:"relative",top:"2.5vh",fontSize:"6vh"}}>{this.props.title}</h2>
        <h2 style={{display:"inline-block",position:"relative",top:"2.5vh",fontSize:"2.5em"}}>{this.props.title1}</h2>
        <i style={{marginLeft:"-129px", fontSize:"1.75em"}} className="student icon" />
        {( window.token != "" )?
        <i className="sign out icon" aria-hidden="true" style={{float:"right",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.prompt}></i>
        :
        <i className="icon" style={{float:"right",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.prompt}></i>

        }
    </div>)
  }
});
module.exports = TopBar;
