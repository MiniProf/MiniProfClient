var React  = require('react');
var TopBar = require('../components/TopBar');
var CreateSessionPage = React.createClass({
  render:function(){
    return(
    <div id="sessionDetails">
      <form>
        <br></br>
         Session Name:
         <input type="text" placeholder="Please name the session" />
          <br></br>
          <br></br>
          <br></br>
        Enter or select lecture duration using the dropdown:
          <br></br>
          <input list="dList" name="dList" />
          <datalist id="dList">
            <option value="50 mins" />
            <option value="60 mins (1hr)" />
            <option value="110 mins (1hr 50 mins)" />
            <option value="120 mins (2hrs)" />
          </datalist>
          <br></br>
          <br></br>
          <br></br>
          <input type="submit" />
      </form>
    </div>
    )
  }
});

module.exports = CreateSessionPage;
