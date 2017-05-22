var React  = require('react');
var request = require('superagent');
var TopBar = require('../components/TopBar');
var io = require("socket.io-client");
import {PieChart, Pie, Legend,Tooltip,Cell} from 'recharts';
var inter;

const COLORS = ['#F1C40F', '#2874A6', '#E74C3C', '#28B463'];



var StartPollPage = React.createClass({
  getInitialState:function(){
    request.post(serverName + "Poll/Create/?TOKEN=" + token)
    .set({'content-type':'application/x-www-form-urlencoded'})
    .send({"SESSIONID":sessionID}).end((er,res)=>{console.log(res);});
    return {pieData:[
      {name:"A",value:0},
      {name:"B",value:0},
      {name:"C",value:0},
      {name:"D",value:0}]};
  },
  componentWillMount:function(){
    var socket = io("http://sccug-mini-prof.lancs.ac.uk:8000")
    socket.on('connect', (client) => {
        socket.emit("init", {tableName:"MP_Questions",value:sessionID});
        console.log("CONNECTED");
        socket.on("message", (msg) => {
          debugger;
          var newData = [{name:"A",value:msg.Acount},
                {name:"B",value:msg.Bcount},
                {name:"C",value:msg.Ccount},
                {name:"D",value:msg.Dcount}];
                this.setState({pieData:newData},()=>{this.resize();});

        });
    });
  },
  componentWillUnmount:function(){
    clearInterval(inter);
    window.removeEventListener("resize", this.resize);
  },
  resize:function(){
    var width=$('body').width();
    this.setState({width:width,height:width/3});
  },

  render:function(){
    if(topbar)
      topbar.forceUpdate();
    var pieData = this.state.pieData;
    debugger;
    return(
      <div>

    <div id="myChart" style={{textAlign:'center',width:this.state.width,height:this.state.height, display:'inlineBlock'}}>
      <PieChart width={this.state.width} height={this.state.height} onMouseEnter={this.onPieEnter}>
        <Pie
          isAnimationActive = {false}
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={200}
          fill="#8884d8"
        >
        	{
          	pieData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>

        {/* <table>
        <tr>
          <td>A</td>
          <td>{pieData[0].value}</td>
        </tr>
        <tr>
          <td>B</td>
          <td>{pieData[1].value}</td>
        </tr>
        <tr>
          <td>C</td>
          <td>{pieData[2].value}</td>
        </tr>
        <tr>
          <td>D</td>
          <td>{pieData[3].value}</td>
        </tr>
      </table>*/}
        <button className = "ui red button" onClick={this.context.router.goBack}> End Poll </button>
      </div>
    </div>
    )
  },
  componentDidMount:function(){
    this.resize();
    window.addEventListener("resize", this.resize);
  }
});
module.exports = StartPollPage;
