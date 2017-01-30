var React  = require('react');
var TopBar = require('../components/TopBar');
var ReviewBlock = require('../components/ReviewBlock');
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar } from 'recharts';
var request = require('superagent');

const data = [
  { time: '1', TooFast: 0, TooSlow: 0, NeedHelp: 0 },
  { time: '2', TooFast: 0, TooSlow: 6, NeedHelp: 10  },
  { time: '3', TooFast: 0, TooSlow: 16, NeedHelp: 15 },
  { time: '4', TooFast: 3, TooSlow: 18, NeedHelp: 17  },
  { time: '5', TooFast: 6, TooSlow: 19, NeedHelp: 27 },
  { time: '6', TooFast: 13, TooSlow: 19, NeedHelp: 36  },
  { time: '7', TooFast: 15, TooSlow: 19, NeedHelp: 39 },
  { time: '8', TooFast: 15, TooSlow: 34, NeedHelp: 44  },
  { time: '9', TooFast: 20, TooSlow: 38, NeedHelp: 45 },
  { time: '10', TooFast: 30, TooSlow: 41, NeedHelp: 53  },
];

var ReviewResponsesPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  componentWillMount:function() {
    request.get(serverName + "Review?SESSIONID=000000")
    .end((err,res)=>{
      debugger;
      this.setState({reviews:[{Quote:"Excellent"},{Quote:"slide 3 was too vague"}]});
    })

  },
  render:function(){
    if(this.state.reviews){
      var reviews = this.state.reviews;
      var reviewBlocks = reviews.map((i)=>{
        return (<ReviewBlock item={i} />)
      });
      return(

      <div id="lecReviews">
        <div style={{textAlign:"center"}} className='line-chart-wrapper'>
          <LineChart width={1050} height={250} data={data}
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
