var React  = require('react');
var ReactDOM  = require('react-dom');

var TopBar = React.createClass({
  getInitialState(){
    debugger;
    topbar = this;
    return {};
  },
  goBack:function(e){
    e.preventDefault();
    debugger;
    this.props.history.goBack();
  },
  signoutprompt:function() {
     if (confirm("Are you sure?") == true) {
       token = "";
       this.forceUpdate();
      this.props.router.replace("/");
     }
  },
  update:function(){
    this.forceUpdate();
  },

  render:function(){
    var path = this.props.history.getCurrentLocation().pathname
    var canGoBack = (path != "/" && path != "/index");
    debugger;
    console.log("topbar renderring",token);
    return (<div id="TopBar" style={{height:"10vh",width:"100vw",textAlign:"center"}}>
        {(canGoBack)?
          <i className="chevron left icon" style={{float:"left",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.goBack}></i>
        :
        <i className="icon" style={{float:"left",fontSize:"7vh",width:"5%",display:"inline-block"}}></i>
      }
        <h2 style={{display:"inline-block",position:"relative",top:"2.5vh",fontSize:"6vh"}}>{this.props.title}</h2>
        <h2 style={{display:"inline-block",position:"relative",top:"2.5vh",fontSize:"2.5em"}}>{this.props.title1}</h2>
        <i style={{marginLeft:"-129px", fontSize:"1.75em"}} className="student icon" />
        {( token != "" )?
        <i className="sign out icon" aria-hidden="true" style={{float:"right",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.signoutprompt}></i>
        :
        <i className="icon" style={{float:"right",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} ></i>
        }
    </div>)
  }
});
module.exports = TopBar;
