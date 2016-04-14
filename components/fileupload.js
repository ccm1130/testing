"use strict";

var React = require('react'),    
    Dropzone = require('react-dropzone'),
    $ = require('jquery');

var Global = require('./global').getInstance(); 

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._click = this._click.bind(this);
    this._uploads = this._uploads.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);

    this.state = {
      data: {imgList: []}
    };
  }

  onDrop(files) {
    //console.log('Received files: ', files);
    var imgList = $.merge(this.state.data.imgList, files);
    this.setState({data: {imgList: imgList}});    
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  _uploads(evt) {   
    evt.preventDefault();  

    var me = this;
    var imgList = this.state.data.imgList;

    if (imgList.length <= 0) {
      alert('please select a file');
      return;
    }

    var formData = new FormData($('#upload-form')[0]); 

    $.each(imgList, function(key, value)
    {
      formData.append(key, value);
    });

    $.ajax({
      url: '/api/upload',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      enctype: 'multipart/form-data',
      processData: false,
      success: function (response) {
        me.setState({data: {imgList: []}});
        alert(response);
      }
    });
  }

  _click(index, e) {
    console.log('click', index);
    var imgList = this.state.data.imgList;

    imgList.splice(index, 1);

    this.setState({data: {imgList: imgList}});
  }

  render() {
    console.log('State files:', this.state.data.imgList);
    var me = this;
    var userid = Global.getUser()._id;
    return (
        <div>          
          <form id="upload-form" method="post" onSubmit={this._uploads}>
            <Dropzone ref="dropzone" onDrop={this.onDrop} size={300} height={100} >
              <div className="dropzone">Try dropping some files here, or click to select files to upload.</div>              
            </Dropzone>
            <div onClick={this.onOpenClick}> Open </div>                                
            {
              this.state.data.imgList.map(function(item, index) {
                return  <img  
                            src={item.preview} 
                            key={index}
                            onClick={me._click.bind(null, index)}
                            width='50' 
                            height='50' />
              })
            }            
            <input type="hidden" name="username" value={userid} />
            <input className="btn btn-primary"type="submit" value="Upload" />
          </form> 
        </div>
    );
  }
};