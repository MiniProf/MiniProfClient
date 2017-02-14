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
    return(
      <div>
        <div id="myChart" style={{width:"100%",height:"100%"}}></div>
        <PieChart width={this.state.width} height={this.state.height}>
          <Pie isAnimationActive={false} data={this.state.pieData} cx={200} cy={200} outerRadius={80} fill="#8884d8">
          </Pie>
          <Tooltip />
       </PieChart>
       <br></br>
        <button className = "fluid ui button"> Click to go back </button>
      </div>
    )
  },
  componentDidMount:function(){


    inter = setInterval(()=>{

      request.get(serverName + "Poll/?ID=2")
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
