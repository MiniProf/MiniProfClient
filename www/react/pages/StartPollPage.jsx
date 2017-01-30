var React  = require('react');
var request = require('superagent');
var TopBar = require('../components/TopBar');
import {PieChart, Pie, Legend,Tooltip} from 'recharts';
var StartPollPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  resetAPI:function() {
    request.get(serverName + "/PollReset.php").end((err,res)=>{});
  },
  componentWillMount:function(){
    this.resize();
  },
  componentWillUnmount:function(){
    window.removeEventListener("resize", this.resize);
  },
  resize:function(){
    var width=$('body').width();
    this.setState({width:width,height:width/3});
  },

  render:function(){
    return(
      <div>
        <div id="myChart" style={{width:"100%",height:"100%"}}></div>
        <PieChart width={this.state.width} height={this.state.height}>
          <Pie isAnimationActive={false} data={this.state.pieData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
          <Tooltip />
       </PieChart>
        <button className = "fluid ui button" style = {{margin:"10px 0px"}} onClick={this.resetAPI}> Reset </button>
      </div>
    )
  },
  componentDidMount:function(){


    setInterval(()=>{

      request.get(serverName + "Poll/PollStats.php")
      .send({ID:2})
      .end( (err,res)=>{
        console.log(res);
        debugger;
        res.body = JSON.parse(res.text.substr(0,38));
        debugger;
        if(!err){
          this.setState({pieData:[
            {name:"A",value:res.body.results.A},
            {name:"B",value:res.body.results.B},
            {name:"C",value:res.body.results.C},
            {name:"D",value:res.body.results.D}
          ]});
        }
        // Remove the first point so we dont just add values forever
      });

    },200);
    window.addEventListener("resize", this.resize);
  }
});
module.exports = StartPollPage;
