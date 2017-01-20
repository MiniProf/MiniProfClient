var React  = require('react');
var ReactDOM  = require('react-dom');

var ReviewBlock = React.createClass({
  render:function(){
    return (
        <tr className="ReviewBlock">
          <h3>"{this.props.item.Quote}"</h3>
        </tr>
  );
  }
});
module.exports = ReviewBlock;
