"use strict";

var React = require('react'),    
    $ = require('jquery');

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._toggle = this._toggle.bind(this);

    this.state = {
      value: '1',
      value1: '1',
      value2: '2',
      optWidth: 0
    };
  }

  componentDidMount() {
    var value1 = (typeof this.props.value1 === 'undefined') ? '1' : this.props.value1;
    var value2 = (typeof this.props.value2 === 'undefined') ? '2' : this.props.value2;
    var opt1Width = $("#" + this.props.id + ">#option1").outerWidth();    
    var opt2Width = $("#" + this.props.id + ">#option2").outerWidth();
    var optWidth = (opt1Width > opt2Width) ? opt1Width : opt2Width;

    $("#" + this.props.id).outerWidth(optWidth + 37);
    $("#" + this.props.id + ">.toggle-option-outer").outerWidth(optWidth + 25);
    
    this.setState({
      optWidth: optWidth, 
      value: ((this.props.defaultOption === '1') || (this.props.defaultOption === value1)) ? value1 : value2,
      value1: value1,
      value2: value2
    });

    if ((this.props.defaultOption === '2') || (this.props.defaultOption === this.props.value2)) {      
      this._toggle(optWidth);
    } 
  }

  _toggle(pOptWidth) {
    var optWidth = (pOptWidth > 0) ? pOptWidth+10 : this.state.optWidth + 10;
    var value1 = this.state.value1;
    var value2 = this.state.value2;
    var move = this.state.value === value1 ? "-" + optWidth : 0;
    var value = this.state.value === value1 ? value2 : value1;
    var duration = (typeof this.props.duration !== 'undefined') ? this.props.duration : 0.5;
    var toggle = $("#" + this.props.id);

    this.setState({value: value});
    console.log("move: " + move) ;

    if (toggle) {
      toggle.css("transition-duration", ".6s");                  
      toggle.css("transform", "translate(" + move + "px,0)");            
    }  

    this.props.handleToggle(value);
  }

  render() {
    //console.log('render toggle');
    var option1 = (typeof this.props.option1 !== 'undefined') ? this.props.option1 : 'On';
    var option2 = (typeof this.props.option2 !== 'undefined') ? this.props.option2 : 'Off';

    return (
      <div className="toggle-option-container" >
        <div className="toggle-option-group" id={this.props.id}>        
          <div className="toggle-option-outer btn-primary" id="option1" onClick={this._toggle}>
            <div className="toggle-option-inner">{option1}</div>
          </div>         
          <div className="toggle-option-outer btn-default" id="option2" onClick={this._toggle}>
            <div className="toggle-option-inner">{option2}</div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports.propTypes = {   
  id:               React.PropTypes.string.isRequired, 
  option1:          React.PropTypes.string,
  option2:          React.PropTypes.string,
  value1:           React.PropTypes.string,
  value2:           React.PropTypes.string,
  duration:         React.PropTypes.number,
  defaultOption:    React.PropTypes.string,
  handleToggle:     React.PropTypes.func.isRequired
};