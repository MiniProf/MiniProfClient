var React  = require('react');
var request = require('superagent');
var TopBar = require('../components/TopBar');
const { Alert, Card, Col, Container, FormField, FormInput, InputGroup, Pagination, Pill, Row, Table } = require('elemental');

var SearchPage = React.createClass({
  getInitialState:function(){
    return {text:"",chips:[],list:[]};
  },
  textChanged:function(e){
    var value = e.currentTarget.value;
    this.setState({text:value});
    if(value){
      request
      .get('json/preferences.json')
      .set('Accept', 'application/json')
      .end((err,res)=>{
        debugger;
        var chips = [];
        var id =0;
        if(res.ok){
          res.body.map((chip)=>{
            if(chip.toUpperCase().indexOf(value.toUpperCase())!== -1){
              if(this.state.chips.indexOf(chip)==-1){
                chips.push(chip);
                id++;
              }
            }
          });
        }
        this.setState({list:chips});
      });
    }
    else {
      this.setState({list:[]});
    }
  },
  addChip:function(chip){
    debugger;
    var chips = this.state.chips;
    chips.push(chip);
    //remove chip from list of options
    var list = this.state.list;
    list.splice(list.indexOf(chip),1);
    this.setState({chips:chips,list:list});
  },
  removeChip(id){
    var chips = this.state.chips;
    chips.splice(id,1);
    this.setState({chips:chips});
  },
  render:function(){
    var list = [];
      this.state.list.map((chip,id)=>{
        console.log(this);
        list.push(<div className="item PrefItem" onClick={()=>{this.addChip(chip)}}>{chip}</div>);
      });
    var chips = [];
      this.state.chips.map((chip,id)=>{
        chips.push(<Pill label={chip} onClear={()=>{this.removeChip(id)}} onClick={()=>{this.removeChip(id)}}/>);
      });
    if(this.state.list.length === 0 && this.state.text.length > 0){
      list.push(<div>Not Found</div>)
    }
    return (<div id="SearchPage" className="page">
      <h2 className="ui header">What Do You Need ?</h2>
      <div className="fluid ui icon input">
        <input placeholder="Search..."
          type="text"
          onChange={this.textChanged}
          value={this.state.text} style={{zIndex:10}}/>
        <i className="search icon"></i>
      </div>
      <div className="ui segment listPreferences" style={{marginTop:"-0.5em",display:(this.state.text)?"inherit":"none"}}>
        <div className="ui list">
          {list}
        </div>
      </div>
      <div className="ui segment">
        {chips}
      </div>
      <div onClick={()=>{this.props.router.goto("/datetime");}} className="ui fluid positive button">Next</div>
    </div>);
  }
});
module.exports = SearchPage;
