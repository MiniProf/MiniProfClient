var React  = require('react');
var TopBar = require('../components/TopBar');
import {  ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
          ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, BarChart, Bar } from 'recharts';
var request = require('superagent');
var inter;
var io = require("socket.io-client");
var seshDashboard = React.createClass({

  getInitialState:()=>{
    if(window.localStorage.getItem("sessionCode") != null){
      window.sessionID = window.localStorage.getItem("sessionCode");
    }
    return {
      TF:0,
      TS:0,
      NH:0
    };
  },
  endprompt:function() {
     if (confirm("Are you sure you want to end the session?") == true) {
         this.endsesh();
     }
 },
 request:function(){
   request.get(serverName + "TLS/?SESSIONID=" + window.sessionID + "&" +"TOKEN="+ token)
   .end((err,res)=>{
     this.setState({tls:res.body.msg});
     this.resize();
   });
 },
 /*server side fixed*/
 endSesh:function(){
   request.post(serverName + "Sessions/endSession/?" +"TOKEN="+ token)
   .set({'content-type':"application/x-www-form-urlencoded"})
   .send({SESSIONID:sessionID})
   .end((err,res)=>{
     debugger;
     if(!err && !res.body.error){
       this.context.router.replace('/index');
       window.localStorage.removeItem("sessionCode");
       sessionID="";
     }
     else{
       alert("Error in ending session!");
     }
   })
 },
 componentWillMount:function(){
   this.request();
   var socket = io("http://sccug-mini-prof.lancs.ac.uk:8000")
   socket.on('connect', (client) => {
     debugger;
       socket.emit("init", {tableName:"MP_TLS",value:sessionID});
       socket.on("message", (msg) => {
         console.log(msg);
         debugger;
         if (msg.clicked == "TF") {
           this.incrementCount("TF");
           return;
         }
         else if (msg.clicked == "TS") {
           this.incrementCount("TS");
           return;
         }else if (msg.clicked == "NH") {
           this.incrementCount("NH");
           return;
         }
       });
   });
},
decrementCount:function(a){
  this.setState({[a]:this.state[a]-1})
},
incrementCount:function(a){
  this.setState({
    [a]:this.state[a] +1
},
  ()=>{setTimeout(()=>{this.decrementCount(a);}, 20000)});
},
componentDidMount:function() {
  this.resize;
 window.addEventListener("resize", this.resize);
 inter = setInterval(this.request, 30000);
},
componentWillUnmount:function(){
 window.removeEventListener("resize", this.resize);
 clearInterval(inter);
},
resize:function(){
 var width=$('body').width();
 this.setState({width:width/1.5,height:width/3});
},
  render:function(){
    if(topbar)
      topbar.forceUpdate();
    return(
      <div id="lecReviewslive" >
        <br></br>
        <h2 style={{textAlign:"center", display:"inlineBlock", position:"relative"}}>Session ID: {window.sessionID}</h2>
        <br></br>
        <div style={{textAlign:"center",overflowX:"auto",width:"100%",}} className='bar-chart-wrapper'>
        	<BarChart  style = {{margin:'0 auto'}} width={this.state.width} layout="vertical" height={this.state.height} data={[
              {name: 'Problems',  TooSlow: parseInt(this.state.TS),
                                  TooFast: parseInt(this.state.TF),
                                  Confused: parseInt(this.state.NH)}]}>
           <XAxis type = "number" domain = {[0,20]} />
           <YAxis type = "category" dataKey = "name" />
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar isAnimationActive = {false} dataKey="TooFast" fill="#F1C40F" />
           <Bar isAnimationActive = {false} dataKey="Confused" fill="#2874A6" />
           <Bar isAnimationActive = {false} dataKey="TooSlow" fill="#E74C3C" />
          </BarChart>
        </div>
        <br></br>

    <div style={{textAlign:"center", display:"inlineBlock", position:"relative"}}>
      <a onClick={()=>{this.context.router.push("/StartPollPage");}}>
        <button className="ui green primary submit button">Start Poll</button>
      </a>
      <br></br>
      <br></br>
      <a onClick={this.endSesh}>
        <button className="ui red button">End Session</button>
      </a>
  </div>
  <br></br>
{/*}  <div onClick={this.endSesh} style={{marginRight:"100px",fontSize:"1.5em"}} className="ui icon button" data-tooltip="End session" data-position="right" data-inverted="">
    <i className="remove circle icon" aria-hidden="true" ></i>
  </div>*/}
</div>
    )
  }
});
module.exports = seshDashboard;
