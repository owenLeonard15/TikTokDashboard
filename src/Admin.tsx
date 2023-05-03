import React from 'react';
import { useState } from "react";
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

export const Admin = ({user}) => {

   

    const [inText, setInText] = useState("")

    const handleChange = (e) => {
        setInText(e.target.value)   
    }

    const handleSubmit = () => {
        //INSERT API Create user call
        //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminCreateUser-property
        createUser(inText);
        setInText("")
    }

    const getAccessToken = () => {
        console.log(user.signInUserSession.accessToken.jwtToken)  
        return user.signInUserSession.accessToken
    }

    const createRandomPassword = () => {
        const length = 12; // Password length
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Allowed characters
        let password = '';
        for (let i = 0; i < length; i++) {
          password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    };

    //username is 8-4-4-4-12 
    //ex: ########-####-####-####-############
    const createRandomUsername = () => {
        const length = 32; // Username length: total of 32 non '-' chars
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Allowed characters
        let username = '';
        for (let i = 0; i < length; i++) {
          username += charset.charAt(Math.floor(Math.random() * charset.length));
          if (i === 7 || i === 11 || i === 15 || i === 19){
            username += '-'
          }
        }
        return username;
    }
    
    
    const createUser = (email) => {
        const password = createRandomPassword();
        const username = createRandomUsername();
        const accessToken = getAccessToken();

        const params = {
            UserPoolId: 'us-east-1_TM2BbRQih',
            Username: username,
            TemporaryPassword: password,
            DesiredDeliveryMediums: [ 'EMAIL' ],    
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
                {
                    Name: 'email_verified',
                    Value: 'True'
                }
            ],
            Headers: {
                Authorization: accessToken
              }
        };
        
        cognitoIdentityServiceProvider.adminCreateUser(params, (err, data) => {
            if (err) {
            console.log(err, err.stack);
            } else {
            console.log('User created successfully:', data);
            }
        });
    };
      
    
    return <div style={{
            "display": "flex", 
            "alignItems": "center", 
            "justifyContent": "center", 
            "flexDirection": "column", 
            "width": "100%", 
            "height": "100%",
            "margin": "0", 
            "top": "0"
        }}>
            <div style={{
                "display": "flex", 
                "alignItems": "center", 
                "justifyContent": "center", 
                "flexDirection": "column", 
                "width": "400px", 
                "height": "200px",
                "background": "white",
                "border": "solid 1px gray",
                "boxShadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
            }}>
                <h2 >Give access to the dashboard</h2>
                <div style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "width": "100%", 
                        "justifyContent": "center"
                    }}>
                    {/* <p style={{"marginRight": "10px"}}>Enter email </p> */}
                    <input value={inText} onChange={handleChange} placeholder="example@gmail.com"/>
                    <button onClick={handleSubmit} style={{"marginLeft": "10px"}}>Send Invite</button>
                </div>
            </div>
    </div>
}


//-------------------
