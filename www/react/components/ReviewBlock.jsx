var React  = require('react');
var ReactDOM  = require('react-dom');

var ReviewBlock = React.createClass({
  render:function(){
    return (
        <div className="extra content" style={{textAlign:'center'}}>
          <h2>"{this.props.item.Quote}"</h2>
        </div>
  );
  }
});
module.exports = ReviewBlock;
