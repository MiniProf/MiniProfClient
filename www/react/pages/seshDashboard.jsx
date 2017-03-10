var React  = require('react');
var TopBar = require('../components/TopBar');
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar } from 'recharts';
var request = require('superagent');
var inter;

var seshDashboard = React.createClass({
  getInitialState:()=>{
    return {};
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
        <div style={{textAlign:"center",overflowX:"auto",width:"100%"}} className='line-chart-wrapper'>
          <LineChart width={this.state.width} height={this.state.height} data={this.state.tls}
          margin={{ top: 5, right: 50, left: 20, bottom: 45 }}>
          <XAxis dataKey="time" label="Time(mins)"/>
          <YAxis label="No. of students"/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="TooFast" stroke="#8884d8" />
          <Line type="monotone" dataKey="TooSlow" stroke="#82ca9d" />
          <Line type="monotone" dataKey="NeedHelp" stroke="#f2a73e" />
        </LineChart>
        </div>
        <br></br>

    <div style={{textAlign:"center", display:"inlineBlock", position:"relative"}}>
      <a onClick={()=>{this.props.router.goto("/StartPollPage");}}>
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
