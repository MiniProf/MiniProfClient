var React  = require('react');
var TopBar = require('../components/TopBar');
var request = require('superagent');

var CreateSessionPage = React.createClass({
  getInitialState(){
    return {seshName:""}
  },
  sessionInit:function(){
    debugger;
    request.post(serverName + "Sessions/startSession/?" + "TOKEN="+ token)
    .type('form')
    .send({NAME:this.state.seshName})
    .end((err,res)=>{
      if(!err && !res.body.error){
        sessionID = res.body.msg.SESSIONID;
        this.context.router.push('/seshDashboard');
      }
      else{
        alert("Something has gone wrong, the session couldn't be created.");
      }
    })
  },
  onchange:function(e){
    this.setState({seshName:e.target.value});
  },
  render:function(){
    if(topbar)
      topbar.forceUpdate();
    return(
    <div id="sessionDetails">
        <br></br>
         <p style={{display:"inline-block", position:"relative"}}>Session Name:</p>
         <input type="text" value={this.state.seshName} onChange={this.onchange} placeholder="Please name the session" />
          <br></br>
          <br></br>
          <br></br>
          <input type="submit" onClick={()=>{this.sessionInit();}}/>
    </div>
    )
  }
});

module.exports = CreateSessionPage;
