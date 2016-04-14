"use strict";

var React = require('react'),
    $ = require('jquery');

var ReactBootstrap = require('react-bootstrap'),
    Grid    = ReactBootstrap.Grid,
    Row     = ReactBootstrap.Row,
    Col     = ReactBootstrap.Col,
    Panel   = ReactBootstrap.Panel;

var DropDown = require('./dropdown');

class BookFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._handleFilter = this._handleFilter.bind(this);
  }

  _handleFilter(value) {    
    this.props._handleFilter(value);
  }

  render() {
    return (
        <div>
          <DropDown title='Kind' 
                    caption='--- All ---'
                    type='BOOKCAT'
                    resUrl='categories' 
                    onChange={this._handleFilter} />
        </div>        
      );
  }
}

function BookItem(props) {
  return (            
          <Col xs={12} sm={4} md={3}>
            <Panel>
              {props.book.name}
              ${props.book.price}
              <span className="glyphicon glyphicon-remove-circle"
                onClick={props.handleDelete}>
              </span>
            </Panel>
          </Col>
        );
}

BookItem.propTypes = {    
  handleDelete: React.PropTypes.func.isRequired,
  book: React.PropTypes.object.isRequired
};

class BookList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleFilter = this._handleFilter.bind(this);

    this.state = {
              data: {books: []},
              filterKind: '',
              limit: 10, //desktop and mobile should load diff number of record
              loadCount: 0,
              lastFetchTime: null
            };
  }

  // getDefaultProps: function() {
  //   console.log('getDefaultProps');
  //   //return {data:{books:[{name:'book1'}, {name: 'book2'}]}};
  //   //var _data
  //   var me = this;
  //   me.data = '';

  //   return this.fetchData(function(data){
  //       console.log('callback');
  //       console.log(data);        
  //       return data
  //     });

  //   console.log('return');
  //   return me.data;            
  // },

  componentDidMount() {
    var me = this;
    var array = [];

    this._loadData();

    $(document).bind('scroll', function() {
      console.log('scrolling');
      me._loadMore();        
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    $(document).unbind('scroll');    
  }

  _handleDelete(index, event) {
    console.log('delete book');

    var me = this;
    var books = this.state.data.books;
    var bookId = books[index]._id
    
    books = books.splice(index, 1);

    this.setState(books);

    $.ajax({
      url: '/api/books/' + bookId,
      type: 'DELETE',
      success: function(result) {
          console.log('Deleted');
      }
    });
  }

  _handleFilter(filterKind) {
    console.log('handleFilter: ' + filterKind);
    this.setState({filterKind: filterKind});
  }

  _isBottom(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();    

    return ((elemBottom <= docViewBottom-50) && (elemTop >= docViewTop));
  }

  _loadData() {
    var me = this; 
    var curDt = new Date();
    var timeDiff = (curDt - this.state.lastFetchTime) / 1000;

    if (this.state.lastFetchTime === null || timeDiff >= 30) {         

      $.ajax({
        url: '/api/books?limit=' + me.state.limit + "&skip=" + me.state.loadCount * me.state.limit,
        dataType: 'json',
        success: function(data) {
          console.log('setState');
          array = $.merge(me.state.data.books, data);                

          if (Object.keys(data).length === 0) {
            console.log('End of List');
            this.state.lastFetchTime = new Date(); 
          }
          else {
            this.setState({data: {books: array} });
            me.state.loadCount++;
            me._loadMore();
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('#GET Error', status, err.toString());
        }.bind(this)
      });
    } 
  }

  _loadMore() {
    if (typeof $('.loading') !== 'undefined')
      if (this._isBottom($('.loading')))
        this._loadData();
  }

  render() {
    console.log('render book-list');
    var me = this;

    return (
      <Grid className="grid">
        {/* Pass it to child */}
        {/* <BookItem data={this.state.data}/>} */}  
        <Row>
          <Col sm={12}>
            <BookFilter 
              filterKind={this.props.filterKind}
              _handleFilter={this._handleFilter} 
            />
          </Col>
        </Row>
        <br/>
        <Row>
        {
          this.state.data.books.map(function(book, index) {
            if (book.kind === '' 
              || book.kind === me.state.filterKind 
              || me.state.filterKind === '')   {

              return <BookItem 
                      handleDelete={me._handleDelete.bind(me, index)}
                      book={book} 
                      key={index} />
            }
          })
        }
        </Row>
        <div className="loading">Loading...</div>
        <div><br /><br /><br /></div>
      </Grid>
    );
  }
}

BookList.fetchData = function(callback) {
  // var me = this;
  // //var url =;

  // superagent.get('http://localhost:3100/api/books')
  //   .accept('json')
  //   .end(function(err, res){
  //     if (err) throw err;

  //     var data = {data: {books: res.body} }

  //     console.log('fetch');                  
  //     callback(data);  
  //   });
};

BookList.propTypes = {    
  limit: React.PropTypes.number    
};

module.exports = BookList;