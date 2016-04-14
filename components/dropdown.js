"use strict";

var React = require('react'),
    $ = require('jquery');

var ReactDOM = require('react-dom');

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this.state = { data: {options: []} };
  }

  componentDidMount() {
    this._loadData();
  }

  _onChange() {
    var value = ReactDOM.findDOMNode(this.refs.dropdown).value;
    this.props.onChange(value);
  }

  _loadData() {
    var me = this; 

    var filter = 'type__equals=' + this.props.type;
    var sort = '&sort=sort';

    var url = '/api/' + this.props.resUrl
            + '?' + filter + sort;

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        me.setState({data: {options: data} });        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });    
  }

  render() {
    var me = this;
    return (
        <div>
          {this.props.title !== '' && <label>{this.props.title}</label>}
          <select className="form-control" ref="dropdown" onChange={this._onChange} value={me.props.selectedValue} >
            <option value=''>{this.props.caption}</option>
            {
              this.state.data.options.map(function(item, index) {
                return (
                  <option key={index} 
                          value={item.value} > 
                    {item.caption}
                  </option>
                )
              })
            }                 
          </select>
        </div>        
      );
  }
};

module.exports.propTypes = {    
  title:                React.PropTypes.string.isRequired,
  caption:              React.PropTypes.string.isRequired,
  type:                 React.PropTypes.string,
  resUrl:               React.PropTypes.string.isRequired,
  selectedValue:        React.PropTypes.string,
}; 