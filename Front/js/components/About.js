import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import User from './User';
import Page from './Page';

import * as pageActions from '../actions/pageActions'

class About extends Component {
    render() {
        const { setYear } = this.props.pageActions
        const { user, page } = this.props;
        return <div>
                    <User name={user.name} />
                    <Page setYear={setYear}  page={page.page} year={page.year} />
               </div>
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        page : state.page
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(About)