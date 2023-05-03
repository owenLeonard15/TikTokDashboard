import React from 'react';
import './App.css';
import Dashboard from "./Dashboard";
import { Amplify } from 'aws-amplify'
import { Authenticator, Button, Heading, Image, Flex, Text} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";
import { useState } from 'react';
import {Admin} from './Admin.tsx';
Amplify.configure(awsExports);

const formFields = {
    confirmVerifyUser: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
  
  const components = {
    VerifyUser: {
      Header() {
        return (
          <Heading
            padding={`100 0 0 100`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },
  
    ConfirmVerifyUser: {
      Header() {
        return (
          <Heading
            padding={`100 0 0 100`}
            level={3}
          >
            Enter Information:
          </Heading>
        );
      },
      Footer() {
        return <Text>Footer Information</Text>;
      },
    },

    SignIn: {
        Header() {
          return (
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Image padding= "50px 0 0 0" width="125px" src="https://images.squarespace-cdn.com/content/v1/5b1bb66e25bf023fcbe92110/b27e8c59-ec3e-49ef-9792-f7b9de91272a/websitelogodcdx.png?format=1500w" />
                <Heading
                    level={4}
                >
                    Sign in to your account
                </Heading>
            </Flex>
            
          );
        }
      },
  };

  


function App() {

    const [adminSelected, setAdminSelected] = useState(false)

    return (
        <div style={{"display":"flex", "justifyContent":"center", "alignItems":"center", "height":"100%", "width":"100%"}}>
        <Authenticator
            formFields={formFields}
            components={components}
            hideSignUp={true}
        >
            {({ signOut, user }) => (
            <div className="App">
                    <div style={{"height": "75px", "display": "flex", "justifyContent": "space-between", "flexDirection": "row", "width": "100%", "alignItems": "center", "backgroundColor": "#1d2631", "zIndex": "1", "boxShadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                        <img style={{"width": "auto", "maxHeight": "60px", "padding": "10px"}} alt="dcdx logo" src="https://images.squarespace-cdn.com/content/v1/5b1bb66e25bf023fcbe92110/b27e8c59-ec3e-49ef-9792-f7b9de91272a/websitelogodcdx.png?format=1500w" />
                        {user.attributes.email.split('@')[1] === "dcdx.co" ? 
                            <Button onClick={() => setAdminSelected(!adminSelected)} style={{"marginRight": "-10px", "fontWeight":"normal", "background": "lightgray"}} variation='default'>
                                {!adminSelected ? "Admin Dashboard" : "Home"}
                            </Button> 

                            : null}
                        <Button variation="primary" style={{"marginRight": "10px", "fontWeight":"normal"}} onClick={signOut}>Sign out</Button>
                    </div>
                    {
                        adminSelected 
                        ? <Admin user={user} />   
                        : <Dashboard />
                    }
            </div>
            )}
        </Authenticator>
        </div>
    );
}

export default App;
