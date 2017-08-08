import React, { Component } from 'react';
import { FacebookLogin } from 'react-facebook-login-component';


class FbLogin extends Component {

    constructor (props, context) {
        super(props, context);
    }

    responseFacebook(response) {

        console.log(response);
        this.props.actions.exchangeToken(response.accessToken);
        console.log('Exchanged-token: '+this.props.token);

        this.props.actions.login();
    }

    render(){
        return (
                <div>
                    <FacebookLogin
                        socialId="1993263550910966"
                        language="en_US"
                        scope="public_profile,email"
                        responseHandler={this.responseFacebook.bind(this)}
                        xfbml={true}
                        fields="id,email,name"
                        version="v2.5"
                        className="facebook-login"
                        buttonText="Login With Facebook"
                    />
                </div>
        )
    }
}

export default FbLogin;