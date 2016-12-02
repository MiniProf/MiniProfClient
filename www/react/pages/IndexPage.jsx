var React  = require('react');
var TopBar = require('../components/TopBar');
var IndexPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  render:function(){
    var isBooked = (app.getBookPos())? true:false;
    var bStyle = (!isBooked)?{height: "26vh"}:{};
    return(<div id="IndexPage" className="page">
      {
        (isBooked)?(<div>
          <h3 onClick={()=>{app.removeBookPos();this.forceUpdate();}}>
            Your Desk is at A6
          </h3>
          <div id="map" style={{height: "40vh",borderRadius:"2vh"}}>
          </div>
          <div>
            <h3 onClick={()=>{app.removeBookPos();this.forceUpdate();}}>
              <i className="remove icon" style={{color:"red"}}></i>
              Remove Booking
            </h3>
          </div>
        </div>):null
      }
      <a onClick={()=>{this.props.router.goto("/search");}}>
        <button style={bStyle} className="ui button fluid homeButton">Book Seat</button>
      </a>
      <a onClick={()=>{this.props.router.goto("/search");}}>
        <button style={bStyle} className="ui button fluid homeButton">Book Group Space</button>
      </a>
      <a onClick={()=>{this.props.router.goto("/findperson");}}>
        <button style={bStyle} className="ui button fluid homeButton">Find Person</button>
      </a>
      <div style={{width:"100%",display:"block"}}>
        <a onClick={()=>{this.props.router.goto("/profile");}}><div id="userIcon"><i className="users icon"></i></div></a>
        <a onClick={()=>{this.props.router.goto("/help");}}><div id="helpIcon"><i className="help icon"></i></div></a>
      </div>
    </div>)
  },
  componentDidMount(){
    debugger;
    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 0, lng: 0},
          zoom: 1,
          streetViewControl: false,
          mapTypeControlOptions: {
            mapTypeIds: ['moon']
          }
        });

        var moonMapType = new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
              var normalizedCoord = getNormalizedCoord(coord, zoom);
              if (!normalizedCoord) {
                return null;
              }
              var bound = Math.pow(2, zoom);
              return './img/floorPlan.png';
          },
          tileSize: new google.maps.Size(2024, 2024),
          maxZoom: 9,
          minZoom: 0,
          radius: 1738000,
          name: 'Moon'
        });

        map.mapTypes.set('moon', moonMapType);
        map.setMapTypeId('moon');
  }
});
module.exports = IndexPage;
