"use strict";

var React = require('react');
var MyModal = require('./my-modal');
var TextBox = require('./common/textbox');
var Validate = require('../common/validation').getInstance();


var ReactBootstrap = require('react-bootstrap'),
    ModalTrigger = ReactBootstrap.ModalTrigger,
    Button = ReactBootstrap.Button;

class Child extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {username:'no-user'};
  }

  componentDidMount() {
    console.log('Child Did Mount', this.props.userid);
    //this.setUserName();
  }

  componentWillReceiveProps(nextProps) {
    console.log('Child Rec Props', nextProps.userid);
    this.setUserName(nextProps.userid);
  }

  setUserName(userid) {
    if (userid === 100)
      this.setState({username: 'TONY'});
  }

  render() {
    console.log('render child');
    return (
      <div>User is {this.state.username}</div>
    );
  }
}

class Info extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {userid:0};
  }

  componentDidMount() {
    console.log('info did mount');
    this.setState({userid:100});
  }

  render() {
    console.log('render info');

    console.log('Is Email: ' + Validate.isEmail('abcf.....@abc.com'));
    console.log('Is Numeric: ' + Validate.isNumeric('1,000.00'));
    console.log('Is Date: ' + Validate.isDate('30/11/2000'));
    console.log('IsNotEmpty:' + Validate.isNotEmpty('30/11/2000'));
    console.log('IsNotEmpty:' + Validate.isNotEmpty(''));
    console.log('minLength:' + Validate.minLength('123', 3));
    console.log('maxLength:' + Validate.maxLength('123', 2));

    //var child = <div> nothing </div>;

    //if (this.state.userid > 0)
    var  child = <Child userid={this.state.userid} />

    return (
        <div className="container">
        {child}
        <button className="btn btn-success">Button</button>
        <Button bsStyle='primary'>Primary</Button>
        <p>hello world</p>
        <Button >hello</Button>
    		<ModalTrigger modal={<MyModal />}>
    			<Button bsStyle='primary' bsSize='large'>Launch demo modal</Button>
    		</ModalTrigger>		
        <TextBox />
        </div>
    );
  }
}

module.exports = Info;