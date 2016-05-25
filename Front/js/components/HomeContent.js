import * as pageActions from '../actions/index';
import React, { Component } from 'react';
import { Link } from 'react-router';
import api from '../api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class HomeContent extends Component {

  constructor() {
    super();
    this.state = {
      total : 0,
      currentPage : 1,
      amountOfButtons : 0
    }
  }

  componentWillMount() {
    this.props.pageActions.getAllCars();
    api.getCount((count) => {
      let perPage = 8;
      this.setState({'total': count});
      this.setState({'amountOfButtons': this.state.total / perPage})
    })
  }

  changeItemsPerPage() {
    setTimeout(()=> {
      let perPage = this.refs.perPage.value;
      let page = this.refs.page.value;
      if (page > this.state.amountOfButtons) {
        page = this.state.amountOfButtons;
        this.setState({'currentPage': page})
      } else if (page < 1) {
        page = 1;
        this.setState({'currentPage': page})
      } else {
        this.setState({'currentPage': page});
      }
      this.props.pageActions.getAllCars(perPage, page - 1);
      this.setState({'amountOfButtons': this.state.total / perPage});
    }, 2000)

  }

  nextPage() {
    setTimeout(()=> {
      let perPage = this.refs.perPage.value;
      let page = this.state.currentPage
      this.props.pageActions.getAllCars(perPage, page - 1);
      this.setState({'currentPage': page == this.state.amountOfButtons ? this.state.amountOfButtons : Number(page) + 1});
      this.setState({'amountOfButtons': this.state.total / perPage})
    }, 2000)
  }

  prevPage() {
    setTimeout(()=> {
      let perPage = this.refs.perPage.value;
      let page = this.state.currentPage;


      this.props.pageActions.getAllCars(perPage, page - 1);
      this.setState({'currentPage': page == 1 ? 1 : Number(page) - 1});
      this.setState({'amountOfButtons': this.state.total / perPage})
    }, 2000)
  }


  render() {


    const { cars } = this.props;

    let carsFromDB = cars.map((i)=> {
      return (
        <div key={i._id +1} className="item col-lg-3 col-md-3 col-sm-4 col-xs-6">
          <img src="img/car.jpg" alt="#"/>
          <div className="item-info">
            <div>
              <span>MODEL</span>
              <span>{i.model ? i.model : 'Call manufacter'}</span>
            </div>
            <div>
              <span>Colour</span>
              <span>{i.color ? i.color : 'Call manufacter'}</span>
            </div>
            <div>
              <span>PRICE</span>
              <span>{i.cost ? i.cost + ' $' : 'Call manufacter'}</span>
            </div>
            <Link to={`/cars/${i._id}/`}>More detail</Link>
          </div>
        </div>
      )
    });

    return (
      <div>
        {carsFromDB}
        <div>
          <h3>Total amount of pages - {Math.ceil(this.state.amountOfButtons)}</h3>
          <h3>Current page - {Math.ceil(this.state.currentPage)}</h3>
          <div style={{'width' : '50%', 'display' :'inlineBlock'}}>
            <input style={{'width' : '50px' }} placeholder='Go to page' ref="page"
                   onChange={this.changeItemsPerPage.bind(this)} type="text"/>
            <span>Items per page</span>
            <select style={{'width' : '50px', 'display' : 'block'}} ref='perPage'
                    onChange={this.changeItemsPerPage.bind(this)}>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>

          <div style={{'width' : '50%', 'display' :'inlineBlock'}}>
            <button className="itemButtons" onClick={this.prevPage.bind(this)}>Prev</button>
            <button className="itemButtons" onClick={this.nextPage.bind(this)}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.mainPage.cars
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeContent)