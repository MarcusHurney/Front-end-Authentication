import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

	//fetchMessage will test the requireAuth function on the server by sending a get request to localhost:3090, it includes the jwt provided
	//upon a successful login. Without the JWT this message will return as a 401 Unauthorized
	componentWillMount() {
		this.props.fetchMessage();
	}

	render() {
		return (
			<div>{this.props.message}</div>
		);
	}
}

function mapStateToProps(state) {
	return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(Feature);