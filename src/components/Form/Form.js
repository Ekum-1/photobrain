import React from "react";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";

class Form extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			fieldName: '',
			fieldEmail: '',
			fieldPassword: ''
		}
	}
	onNameChange = (event) => {
		this.setState({fieldName: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({fieldEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({fieldPassword: event.target.value});
	}

	render () {
		const { fieldName, fieldEmail, fieldPassword } = this.state;
		const { route, onRouteChange, loadUser } = this.props;
		return(
			<div>
				{ route === 'signin' ? (
					<Signin 
					fieldEmail={fieldEmail}
					fieldPassword={fieldPassword}
					onEmailChange={this.onEmailChange}
					onPasswordChange={this.onPasswordChange}
					endpoint='http://localhost:3000/signin'
					loadUser={loadUser}
					onRouteChange={onRouteChange}
					/>
				) : (
					<Register
					fieldName={fieldName}
					fieldEmail={fieldEmail}
					fieldPassword={fieldPassword}
					onNameChange={this.onNameChange}
					onEmailChange={this.onEmailChange}
					onPasswordChange={this.onPasswordChange}
					endpoint='http://localhost:3000/register'
					loadUser={loadUser}
					onRouteChange={onRouteChange}
					/>
				)
			}
		</div>
		)
	}
}

export default Form;