import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {

	handleFormSubmit({ email, password }) {
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>{this.props.errorMessage}</strong>
				</div>
			);
		}
	}

	render() {

		const { handleSubmit, fields: { email, password }} = this.props; //These are added to props when the component is wrapped with redux form

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			  <fieldset className="form-group">
			    <label>Email:</label>
			    <input {...email} className="form-control" />
			  </fieldset>
			  <fieldset className="form-group">
			    <label>Password:</label>
			    <input {...password} type="password" className="form-control" />
			  </fieldset>
			  {this.renderAlert()}
			  <button action="submit" className="btn btn-primary">Sign in</button>
			    <div id="signInMessage" className="alert alert-success">

			    	This sign in page will validate a user""s email and password in MongoDB on the Authentication-Server provided with this
			    	Front-end authentication package.
			    	
			    	<ul>

			    	  <li>
			    		  If the user is successfully signed in, a JWT (JSON WEB TOKEN) is created in local storage containing an eccrypted 
			    		  version of the the user""s id and a secret code used by the server for decryption and user recognition.
			    	  </li>

			    	  <li>
			    	      Whenever the user makes requests to the server, the server will check the JWT for validity 
			    	      before providing access to a route with protected resources, such as querying the database.
			    	  </li>

			    	  <li>
			    	      Since the JWT is stored in the browser""s local storage, it will not be deleted when a user closes the browser
			    	      or navigates away from the page. This means that a user will still be logged in upon returning to the page. The 
			    	      user must click sign out in order to destory the JWT stored in the browser.
			    	  </li>
			    	  <li>
			    	      Redux Form is used to validate the user""s input in the text boxes to ensure a blank field isn""t submitted.
			    	  </li>
			    	</ul> 

			    	Sign in to better understand how this application provides user authentication with React and Redux
			    </div>
		    </form>
		);
		
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);