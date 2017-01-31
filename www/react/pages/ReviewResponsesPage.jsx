var React  = require('react');
var TopBar = require('../components/TopBar');
var ReviewBlock = require('../components/ReviewBlock');
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar } from 'recharts';
var request = require('superagent');

var ReviewResponsesPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  componentWillMount:function() {
    request.get(serverName + "Review/?SESSIONID=000000")
    .end((err,res)=>{
      var quotes = [];
      res.body.msg.map((item)=>{
        quotes.push({Quote:item});
      })
      debugger;
      this.setState({reviews:quotes});
      this.resize();
    });
    request.get(serverName + "TLS/?SESSIONID=000000")
    .end((err,res)=>{
      this.setState({tls:res.body.msg});
      this.resize();
    });
  },
  componentDidMount:function() {
    window.addEventListener("resize", this.resize);
  },
  componentWillUnmount:function(){
    window.removeEventListener("resize", this.resize);
  },
  resize:function(){
    var width=$('body').width();
    this.setState({width:width,height:width/3});
  },
  render:function(){
    if(this.state.reviews){
      var reviews = this.state.reviews;
      var reviewBlocks = reviews.map((i,x)=>{
        return (<ReviewBlock item={i} key={x}/>)
      });
      return(

      <div id="lecReviews" >
        <div style={{textAlign:"center"}} className='line-chart-wrapper'>
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
        <table style={{width:"100%"}}>
            {reviewBlocks}
        </table>
      </div>
        );
    }
    return (<p>Please wait while we load the reviews</p>)
  }
});
module.exports = ReviewResponsesPage;
