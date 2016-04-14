"use strict";

var React = require ('react'),
		Router = require ('react-router'),
		Navigation = Router.Navigation,
		//TransitionHook = Router.TransitionHook,
    //DateTimeField = require('react-bootstrap-datetimepicker'),
    moment = require('moment'),
		$ = require('jquery');

//var Global = require('./global').getInstance();

var DropDown = require('../dropdown');
 
module.exports = React.createClass({
	mixins: [Navigation],

	getInitialState: function() {
    return {  data:{}, 
              modified: false };
  },	

	componentDidMount: function() {

    $.ajax({
      url: '/api/users/' + this.props.params.id,
      dataType: 'json',
      success: function(data) {
        console.log('setState');
        this.setState({data:data});
        console.log(this.state.data);        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });		
	},

  _handleUpdate: function(event) {
    event.preventDefault();

    if (!this.state.modified)
      return;

    var me = this;    

    var data = this.state.data;
    data['modifydt'] = Date();

    $.ajax({
        url: '/api/users/' + this.props.params.id,
        type: 'put',
        data: data,
        headers: {
            'Authorization': 'token-123'
        },
        dataType: 'json',
        success: function (data) {
          me.setState({modified: false});
          alert('Saved');
        }
    });  
  },

  _changeValue: function(field, event) {
    var obj = this.state.data;
    obj[field] = event.target.value;
    
    this.setState({data:obj, modified:true});
  },

  _selectCountry: function(value) {
    var obj = this.state.data;
    obj['country'] = value;

    this.setState({data:obj, modified:true});
  },

  _changeDob: function(value) {
    var obj = this.state.data;
    obj['dob'] = value;

    this.setState({data:obj, modified:true});
    alert(value);
  },

  _uploads: function(evt){   
    evt.preventDefault();

    var formData = new FormData($('#upload-form')[0]); 

    console.log(formData);

    $.ajax({
      //url: '/upload',
      url: '/api/upload',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      enctype: 'multipart/form-data',
      processData: false,
      success: function (response) {
        alert(response);
      }
    });

    return false;
  },

  render: function() {  	
    return (      
    	<div className="container">
        <div className="row">  
          <div className="col-xs-12 col-sm-3">
            <a href="#" className="thumbnail">
              <img  src="/images/profile-img.png" 
                    alt="Profile Image" />
            </a>
          </div>
          <div className="col-xs-12 col-sm-9">
            <p>Username: {this.state.data.username}</p>
            <p>Join Date: {this.state.data.createdt}</p>
          </div>
        </div>
        <form onSubmit={this._handleUpdate}>
          <div className="form-group">          
            <label>First Name</label>
            <input  type="text" 
                    className="form-control"                     
                    placeholder="First Name" 
                    value={this.state.data.fname}
                    onChange={this._changeValue.bind(null, 'fname')}
                    ref="fname" />
          </div>
          <div className="form-group">                    
            <label>Surname</label>
            <input  type="text" 
                    className="form-control" 
                    placeholder="Surname" 
                    value={this.state.data.sname}
                    onChange={this._changeValue.bind(null, 'sname')}
                    ref="sname" />                    
          </div>
          <div className="form-group">                    
            <label>E-mail</label>
            <input  type="email" 
                    className="form-control" 
                    value={this.state.data.email}
                    placeholder="E-mail" 
                    onChange={this._changeValue.bind(null, 'email')}
                    ref="email" />                    
          </div>
          <div className="form-group">
            <DropDown title='Country' 
                      caption='--- Select ---'
                      type='SHOPCAT'
                      resUrl='categories' 
                      onChange={this._selectCountry}
                      selectedValue={this.state.data.country} />                    
          </div> 
          <div className="form-group">         
            <div className="row">
              <div className="col-xs-12">
                <label>Date of birth</label>             
              </div>
            </div> 
          </div>            
          <button type="submit" className="btn btn-default form-control">Save</button>          
        </form>

        { /*
        <form id="upload-form" method="post" onSubmit={this._uploads}>
          <input name="title" type="text" />
          <input multiple="multiple" name="upload" type="file" />
          <input type="hidden" name="userid" value="123" />
          <input type="hidden" name="username" value="abc" />
          <input type="submit" value="Upload" />
        </form>        
        */ }

        {/* move to pop up
          <form>
          <div className="form-group">          
            <label>Old Password</label>
            <input  type="password" 
                    className="form-control" 
                    id="opwd" 
                    placeholder="Old Password" 
                    ref="opwd" />
          </div>
          <div className="form-group">          
            <label>New Password</label>
            <input  type="password" 
                    className="form-control" 
                    id="npwd" 
                    placeholder="New Password" 
                    ref="npwd" />
          </div>
          <div className="form-group">          
            <label>Confirm Password</label>
            <input  type="password" 
                    className="form-control" 
                    id="cpwd" 
                    placeholder="Confirm Password" 
                    ref="cpwd" />
          </div>          
          <button type="submit" className="btn btn-default">Submit</button>
        </form>*/}                
			</div>
    );
  }

});

