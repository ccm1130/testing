"use strict";

var React = require('react'),
    $ = require('jquery');

var ReactBootstrap = require('react-bootstrap'),    
    Panel = ReactBootstrap.Panel,
    ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem;

var Global = require('../global').getInstance();


function ProductItem(props) {
  var productLink = '/products/' + props.product._id;

  return (            
    <ListGroupItem href={productLink}>                      
      <img src="/images/shop-banner.png" alt="..." className="list-group-image" />
      ({props.product.code}) - {props.product.name}&nbsp;&nbsp;
      <small>
        ${props.product.price}
      </small>
    </ListGroupItem>
  );
}

ProductItem.propTypes = {    
  //handleDelete: React.PropTypes.func.isRequired,
  product: React.PropTypes.object.isRequired
};

module.exports = class extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: {products: []}
    };
  }

  componentDidMount() {
    this._loadData();
  }

  _loadData() {  
    var filter = '?shopid__equals=' + this.props.shopId;        

    $.ajax({
      url: '/api/products' + filter,                                            
      dataType: 'json',
      success: function(data) {
        console.log('Products', data);
        this.setState({
          data: {products: data} 
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('#GET Error', status, err.toString());
      }.bind(this)
    });
     
  }

  render() {
    console.log('render product-listgroup');
    var me = this;

    var productNewLink = '/shops/' + this.props.shopId + '/products/new'

    return (
      <Panel header='Products'>
        <ListGroup fill>
          <ListGroupItem href={productNewLink}>
            <span className="glyphicon glyphicon-plus-sign icon-new" />&nbsp;New
          </ListGroupItem>
          {
            this.state.data.products.map(function(product, index) {
                return <ProductItem 
                          product={product} 
                          key={index} />
            })
          }
        </ListGroup>
      </Panel>
    );
  }
};

module.exports.propTypes = {    
  shopId: React.PropTypes.string.isRequired
};
