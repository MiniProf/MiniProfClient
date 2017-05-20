var React  = require('react');
var request = require('superagent');
var TopBar = require('../components/TopBar');
var io = require("socket.io-client");
import {PieChart, Pie, Legend,Tooltip,Cell} from 'recharts';
var inter;
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
      debugger;
        socket.emit("init", {tableName:"MP_Questions",value:"dc"});
        socket.on("message", (msg) => {
          console.log(msg);
          debugger;
          var newData = [{name:"A",value:msg.Acount},
                {name:"B",value:msg.Bcount},
                {name:"C",value:msg.Ccount},
                {name:"D",value:msg.Dcount}];
          this.setState({pieData:newData});
        });
    });
  },
  componentWillUnmount:function(){
    clearInterval(inter);
    window.removeEventListener("resize", this.resize);
  },
  resize:function(){
    var width=$('body').width();
    this.setState({width:width,height:width});
  },

  render:function(){
    if(topbar)
      topbar.forceUpdate();
    var pieData = this.state.pieData || [
      {name:"A",value:0},
      {name:"B",value:0},
      {name:"C",value:0},
      {name:"D",value:0}];
      debugger;
    return(
      <div>
        <div id="myChart" style={{width:"100%",height:"100%"}}></div>

        <table>
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
        </table>
        <button className = "fluid ui button" onClick={this.context.router.goBack}> Click to go back </button>
      </div>
    )
  },
  componentDidMount:function(){
    window.addEventListener("resize", this.resize);
  }
});
module.exports = StartPollPage;
