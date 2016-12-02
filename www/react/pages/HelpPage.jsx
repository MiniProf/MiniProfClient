var React  = require('react');
var TopBar = require('../components/TopBar');
var HelpPage = React.createClass({
  componentDidMount:function(){$('.ui.accordion').accordion();},
  render:function(){
    return (<div id = "helpFeatures">
      <div className="ui styled fluid accordion">
        <div className="active title">
          <i className="dropdown icon"></i>
          Instructions
        </div>
        <div className="active content">
          <p> 1) *SOME TEXT* </p>
          <p> 2) *SOME TEXT* </p>
          <p> 3) *SOME TEXT* </p>
          <p> 4) *SOME TEXT* </p>
        </div>
        <div className="active title">
          <i className="dropdown icon"></i>
          FAQs
        </div>
        <div className="active content">
          <p> How do i change my preferences? </p>
          <div id = "italicWrite"><p> *SOME TEXT* </p></div>
          <br />
          <p> *QUESTION* </p>
          <p> *SOME TEXT* </p>
          <br />
          <p> *QUESTION* </p>
          <p> *SOME TEXT* </p>
        </div>
        <div className="active title">
          <i className="dropdown icon"></i>
          Contact Us
        </div>
        <div className="active content">
          <p>admin@hotpotato.com</p>
        </div>
      </div>
    </div>);
  }
});
module.exports = HelpPage;
