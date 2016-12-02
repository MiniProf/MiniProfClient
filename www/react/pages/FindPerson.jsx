var React  = require('react');
var TopBar = require('../components/TopBar');
var request = require('superagent');
var FindPersonPage = React.createClass({
  getInitialState:function(){
    return {
      text:"",
      list:[]
    }
  },
  genPeople:function(e){
    var value = e.currentTarget.value;
    this.setState({text:value});
    request
    .get('json/people.json')
    .set('Accept', 'application/json')
    .end((err,res)=>{
      var chips = [];
      if(res.ok){
        res.body.map((chip)=>{
          if(chip.name.toUpperCase().indexOf(value.toUpperCase())!== -1){
              chips.push(chip);
          }
        });
      }
      this.setState({list:chips})
    });
  },
  getImage(img){
    return "./img/profiles/"+ img;
  },
  render:function(){
  var list = [];
    this.state.list.map((chip,id)=>{
      console.log(this);
      list.push(<div className="item">
        <img className="ui avatar image" src={this.getImage(chip.img)}></img>
        <div className="content">
          <a className="header">{chip.name}</a>
          <div className="description">{chip.title}</div>
        </div>
      </div>);
    });
  return (<div id="SearchPage">
    <div className="ui icon fluid input">
      <input placeholder="Find Person..."
        type="text"
        onChange={this.genPeople}
        value={this.state.text} style={{zIndex:10}}/>
      <i className="search icon"></i>
    </div>
    <div className="ui segment listPreferences" style={{marginTop:"-0.5em",display:(this.state.text)?"inherit":"none"}}>
      <div className="ui list">
        {list}
      </div>
    </div>
    <div onClick={()=>{this.props.router.goto("/datetime");}} className="ui fluid positive button">Next</div>
  </div>);

  }
});
module.exports = FindPersonPage;
