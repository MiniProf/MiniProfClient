var React  = require('react');
var request = require('superagent');
var TopBar = require('../components/TopBar');
var StartPollPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  resetAPI:function() {
    request.get("http://wilsonator.co.uk/PollReset.php").end((err,res)=>{});
  },
  render:function(){
    return(
      <div>
        <div id="myChart" style={{width:"100%",height:"100%"}}></div>
        <button className = "fluid ui button" style = {{margin:"10px 0px"}} onClick={this.resetAPI}> Reset </button>
      </div>
    )
  },
  componentDidMount:function(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {

      var data = google.visualization.arrayToDataTable([
        ['Answer','Votes'],
        ['A',0],
        ['B',0],
        ['C',0],
        ['D',0]
      ])

      var chart = new google.visualization.PieChart(document.getElementById('myChart'));

      chart.draw(data, {title:""});

    setInterval(function(){

      request.get("http://wilsonator.co.uk/PollResult.php")
      .set('Accept', 'application/json')
      .end( (err,res)=>{
        var result = JSON.parse(res.text).results;
        var data = google.visualization.arrayToDataTable([
          ['Answer','Votes'],
          ["A",result.A],
          ["B",result.B],
          ["C",result.C],
          ["D",result.D]
        ]);
        chart.draw(data,{  width: window.innerWidth,
  height: window.innerHeight*0.8,title:""});
        // Remove the first point so we dont just add values forever
      });

    },200);

  }
}
});
module.exports = StartPollPage;
