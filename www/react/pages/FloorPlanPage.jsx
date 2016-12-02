var React  = require('react');
var TopBar = require('../components/TopBar');
var FloorPlanPage = React.createClass({
  render:function(){
    return (<div className="page">
      <div style={{width:"100%",height:"10vh"}}>
        <h2>Your Desk is at A6</h2>
      </div>
      <div id="map" style={{height:"80vh"}}></div>
    </div>);
  },
  componentDidMount:function(){
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
module.exports = FloorPlanPage;
