var React  = require('react');
var ReactDOM  = require('react-dom');

var TopBar = React.createClass({
  getInitialState(){
    topbar = this;
    console.log(topbar);
    return {};
  },
  goBack:function(e){
    e.preventDefault();
    this.props.history.goBack();
  },
  signoutprompt:function() {
     if (confirm("Sign Out? Are you sure?") == true) {
       token = "";
       window.localStorage.removeItem("tokenCK");
       this.forceUpdate();
       console.log(this.props.history);
       this.props.history.replace('/');
     }
  },
  update:function(){
    this.forceUpdate();
  },

  render:function(){
    var path = this.props.history.getCurrentLocation().pathname
    var canGoBack = (path != "/" && path != "/index");
    console.log("topbar renderring",token);
    return (<div id="TopBar" style={{height:"10vh",width:"100vw",textAlign:"center", background:"red"}}>
        {(canGoBack)?
          <i className="chevron left icon" style={{float:"left",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.goBack}></i>
        :
        <i className="icon" style={{float:"left",fontSize:"7vh",width:"5%",display:"inline-block"}}></i>
      }
        <h2 style={{display:"inline-block",position:"relative",top:"2.5vh",fontSize:"6vh"}}>{this.props.title}</h2>
      {/*  <i style={{marginLeft:"-129px", fontSize:"1.75em"}} className="student icon" /> */}
        {( window.localStorage.getItem("tokenCK") )?
        <i className="sign out icon" aria-hidden="true" style={{float:"right",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} onClick={this.signoutprompt}></i>
        :
        <i className="icon" style={{float:"right",fontSize:"7vh",width:"5%",display:"inline-block",cursor:"pointer"}} ></i>
        }
    </div>)
  }
});
module.exports = TopBar;
