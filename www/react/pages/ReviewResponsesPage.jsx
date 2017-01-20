var React  = require('react');
var TopBar = require('../components/TopBar');
var ReviewBlock = require('../components/ReviewBlock');

var request = require('superagent');
var ReviewResponsesPage = React.createClass({
  getInitialState:()=>{
    return {};
  },
  componentWillMount:function() {
    request.get("http://wilsonator.co.uk/MiniProf/Review?SESSIONID=000000")
    .end((err,res)=>{
      debugger;
      this.setState({reviews:[{Quote:"#GOMO"},{Quote:"Shit Teacher"}]});
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
