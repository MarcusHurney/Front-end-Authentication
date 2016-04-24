import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

	//formProps are all of the fields being controlled by redux form (email, password, passwordConfirm)
	//handleSubmit will not be called if errors exist
	handleFormSubmit(formProps) {
		//call action creator to sign up the user
		this.props.signupUser(formProps);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div id="errorMessage" className="alert alert-danger">
				  <strong>{this.props.errorMessage}</strong>
				</div>
			);
		}
	}

	render() {
		//When the error object is returned from validate(), each field: email, password etc, 
		//is assigned an error property equal to the error object's value for each field (returned from validate) 
		//{password.touched && password.error && <div className="error">{password.error}</div>}
		//the statement above returns the third condition after the && operators if the first two statements are true
		//touched means the user has clicked in and out of the input field
		const {handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
			  <fieldset className="form-group">
			    <label>Email:</label>
			    <input {...email} className="form-control" />
			  </fieldset>
			    {email.touched && email.error && <div className="error">{email.error}</div>}
			  <fieldset className="form-group">
			    <label>Password:</label>
			    <input {...password} type="password" className="form-control" />
			    {password.touched && password.error && <div className="error">{password.error}</div>}
			  </fieldset>
			  <fieldset className="form-group">
			    <label>Confirm Password:</label>
			    <input {...passwordConfirm} type="password" className="form-control" />
			  </fieldset>
			    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
			    {this.renderAlert()}
			  <button action="submit" className="btn btn-primary">Sign Up</button>
			    <div id="signUpMessage" className="alert alert-primary">

			    	If you""ve already read the sign in page information, you should continue onward by signing in or signing up because the processes
			    	on this page are very similar to the signin page.

			    	This sign up page will store the user""s email and password in MongoDB on the Authentication-Server provided alongside this
			    	Front-end Authentication package.
			    	
			    	<ul>

			    	  <li>
			    		  If the user is successfully created, a JWT (JSON WEB TOKEN) is created in local storage containing an eccrypted 
			    		  version of the the user""s id and a secret code used by the server for decryption and user recognition. This also
			    		  happens when a user signs in.
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
			    	      It also checks to make sure the user""s provided password matches the confirm password field before submitting
			    	      the form to the database.
			    	  </li>
			    	</ul> 

			    	Sign up to better understand how this application provides user authentication with React and Redux
			    </div>
			</form>
		);
	}

}

function validate(formProps) {
	const errors = {}; //this will contain the errors for all fields in the form and will be returned from this function

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}
	if (!formProps.password) {
		errors.password = 'Please create a password';
	}
	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Please confirm your password';
	}

	if (formProps.password !== formProps.passwordConfirm) {
		errors.password = 'Passwords must match';
	}

	return errors;
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate //es5 = validate : validate // this function will be run every time the form changes
}, mapStateToProps, actions)(Signup);