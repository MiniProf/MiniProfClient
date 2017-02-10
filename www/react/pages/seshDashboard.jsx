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
  prompt:function() {
     if (confirm("Are you sure?") == true) {
         this.props.router.replaceHistory("/login");
     }
 },
 request:function(){
   request.get(serverName + "TLS/?SESSIONID=000000&TOKEN=68MRAVFENTP0JZ1J9KUWSBOD2TTNYPG5")
   .end((err,res)=>{
     debugger;
     this.setState({tls:res.body.msg});
     this.resize();
   });
 },
 componentWillMount:function(){
   this.request();
},
componentDidMount:function() {
 window.addEventListener("resize", this.resize);
 inter = setInterval(this.request, 100000);
},
componentWillUnmount:function(){
 window.removeEventListener("resize", this.resize);
 clearInterval(inter);
},
resize:function(){
 var width=$('body').width();
 this.setState({width:width,height:width/3});
},
  render:function(){
    return(
      <div id="lecReviewslive" >
        <div style={{textAlign:"center",overflowX:"auto",width:"100%"}} className='line-chart-wrapper'>
          <LineChart width={this.state.width*3} height={this.state.height} data={this.state.tls}
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

    <div>
      <a onClick={()=>{this.props.router.goto("/StartPollPage");}}>
        <button className="ui button fluid homeButton">Start Poll</button>
      </a>
      <br></br>
      <a onClick={this.prompt}>
    <div className="ui icon button" data-tooltip="Sign out" data-position="bottom left" data-inverted="">
      <i className="sign out icon" aria-hidden="true" ></i>
    </div>
    </a>
  </div>
</div>
    )
  }
});
module.exports = seshDashboard;
