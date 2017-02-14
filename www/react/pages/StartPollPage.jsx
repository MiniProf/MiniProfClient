var React  = require('react');
var request = require('superagent');
var TopBar = require('../components/TopBar');
import {PieChart, Pie, Legend,Tooltip,Cell} from 'recharts';
var inter;
var StartPollPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  componentWillMount:function(){
    this.resize();
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
    debugger;
    var pieData = this.state.pieData || [
      {name:"A",value:""},
      {name:"B",value:""},
      {name:"C",value:""},
      {name:"D",value:""}];
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
        <button className = "fluid ui button"> Click to go back </button>
      </div>
    )
  },
  componentDidMount:function(){


    inter = setInterval(()=>{

      request.get(serverName + "Poll/?ID=3&TOKEN="+"68MRAVFENTP0JZ1J9KUWSBOD2TTNYPG5")
      .set('Accept', 'application/json')
      .end( (err,res)=>{
        console.log(res);

        //res.body = JSON.parse(res.text.substr(0,38));

        if(!err){
          this.setState({pieData:[
            {name:"A",value:res.body.msg.Acount},
            {name:"B",value:res.body.msg.Bcount},
            {name:"C",value:res.body.msg.Ccount},
            {name:"D",value:res.body.msg.Dcount}
          ]});
        }
        // Remove the first point so we dont just add values forever
      });

    },200);
    window.addEventListener("resize", this.resize);
  }
});
module.exports = StartPollPage;
