"use strict";

var React = require('react'),    

    Joi = require('joi'),
    validation = require('react-validation-mixin'),
    strategy = require('joi-validation-strategy');

class Demo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);

        this.state = {
          inputField: null
        };
    }

    getValidatorData() {
	  return this.state;
	}

    onChange(field, event) {

    var obj = this.state;
    obj[field] = event.target.value;

    this.setState(obj);

    this.props._onChange(this.props.comId, event.target.value);
	}

    renderHelpText(message) {
		if (!this.props.isValid('inputField'))
	  	return (
	    	<span className="help-block">{message}</span>
	  	);
	}

    validatorTypes() {
		return {inputField: this.props.validation};
	}

    render() {
		var comClass = 'form-group';

		if (!this.props.isValid('inputField')) 
			comClass += ' has-error';

	  return (
	    <div className={comClass}>
	      <label className='control-label' htmlFor={this.props.comId}>Name</label>
	      <input
	      	className='form-control'
	        type='text'
	        ref={this.props.comId}
	        placeholder={this.props.placeholder}
	        value={this.state.name}
	        onChange={this.onChange.bind(null, 'inputField')}
	        onBlur={this.props.handleValidation('inputField')} />
	        {this.renderHelpText(this.props.getValidationMessages('inputField'))}
	    </div>
	  )
	}
}

Demo.displayName = 'Demo';

module.exports = validation(strategy)(Demo);