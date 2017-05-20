var React  = require('react');
var TopBar = require('../components/TopBar');
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, BarChart, Bar } from 'recharts';
var request = require('superagent');
var inter;

var TooSlowVariable;
var TooFastVariable;
var ConfusedVariable;
const barData = [
    {name: 'Problems',  TooSlow: parseInt(TooSlowVariable),
                        TooFast: parseInt(TooFastVariable),
                        Confused: parseInt(ConfusedVariable)},  ];

var seshDashboard = React.createClass({
  incrementCount: function(){
    this.setState({
      TooSlowVariable: this.state.TooSlowVariable + 1
    });
  },

  getInitialState:()=>{
    if(window.localStorage.getItem("sessionCode") != null){
      window.sessionID = window.localStorage.getItem("sessionCode");
    }
    return {
      TooSlowVariable:0,
      TooFastVariable:0,
      ConfusedVariable:0
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
              {name: 'Problems',  TooSlow: parseInt(this.state.TooSlowVariable),
                                  TooFast: parseInt(this.state.TooFastVariable),
                                  Confused: parseInt(this.state.ConfusedVariable)},  ]}>
           <XAxis type = "number" />
           <YAxis type = "category" dataKey = "name" />
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar isAnimationActive = {false} dataKey="TooSlow" fill="#0ABBE2" />
           <Bar isAnimationActive = {false} dataKey="TooFast" fill="#FF0000" />
           <Bar isAnimationActive = {false} dataKey="Confused" fill="#7D0BB6" />
          </BarChart>
        </div>
        <br></br>


    <div style={{textAlign:"center", display:"inlineBlock", position:"relative"}}>
      <a onClick={this.incrementCount}>
        <button className="ui green button">count</button>
      </a>
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
