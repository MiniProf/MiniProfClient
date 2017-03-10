var React  = require('react');
var TopBar = require('../components/TopBar');
var ReviewBlock = require('../components/ReviewBlock');
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar } from 'recharts';
var request = require('superagent');

var ReviewResponsesPage = React.createClass({
  getInitialState:()=>{
    return {
      showGraph: true,
      sessions:[],
      currSessionID:null
    };
  },
  componentWillMount:function() {
    request.get(serverName + "Sessions/getAllSessions/?" + "TOKEN=" + token)
    .set('Accept', 'application/json')
    .end((err,res)=>{
      if(!err && !res.body.error){
        var map = new Map();
        res.body.msg.map((item)=>{
          map.set(item.ID,item);
        });
      }
        this.setState({sessions:map,currSessionID:res.body.msg[0].ID},this.getSessionData);
    });
  },
  getSessionData:function(){
    debugger;
    request.get(serverName + "Review/?SESSIONID=" + this.state.currSessionID + "&" +"TOKEN="+ token)
    .set('Accept', 'application/json')
    .end((err,res)=>{
      var quotes = [];

      res.body.msg.map((item)=>{
        quotes.push({Quote:item});
      })

      this.setState({reviews:quotes});
      this.resize();
    });
    request.get(serverName + "TLS/?SESSIONID=" + this.state.currSessionID + "&" +"TOKEN="+ token)
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
    this.setState({width:width/1.5,height:width/4});
  },
  onSessionSelect:function(e){
    debugger;
    this.setState({currSessionID:e.target.value},this.getSessionData);
  },
  update:function(e){
    this.setState({showGraph:e})
  },
  render:function(){
    if(topbar)
      topbar.forceUpdate();
    if(this.state.reviews && this.state.tls){
      var reviews = this.state.reviews;
      var reviewBlocks = reviews.map((i,x)=>{
        return (<ReviewBlock item={i} key={x}/>)
      });
      var sessions = [];
      this.state.sessions.forEach((item)=>{
        sessions.push(<option value={item.ID}>{item.Name}</option>);
      });
      return(
      <div id="responsePage" className="page">
      <div style={{width:"100%"}} className="">
        <select className="fluid ui dropdown" onChange={this.onSessionSelect} value={this.state.currSessionID}>
        {sessions}
        </select>
      </div>
      <div style={{width:"100%"}} className="large ui buttons">
        <button onClick={this.update.bind(this, true)} className={"ui button " + ((this.state.showGraph)?"active":"")}>Graph</button>
        <button onClick={this.update.bind(this, false)} className={"ui button " + ((!this.state.showGraph)?"active":"")}>Reviews</button>
      </div>
        <div id="lecReviews" style={{textAlign:"center",overflowX:"scroll",overflowY:"hidden",width:"100%",display:(this.state.showGraph)?"block":"none"}} className='line-chart-wrapper'>
          <LineChart width={this.state.width*2} height={this.state.height} data={this.state.tls}
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
        <div id="rev" style={{display:(!this.state.showGraph)?"block":"none"}}>
        <div style={{marginLeft:'5%',width:'90%',marginTop:'2em'}} className="ui card">
            {reviewBlocks}
        </div>
      </div>
    </div>
        );
    }
    return (<div className="ui active inverted dimmer">
              <div className="ui large text loader">Loading
              </div>
            </div>)
  }
});
module.exports = ReviewResponsesPage;
