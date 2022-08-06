import './App.css';
import Dashboard from "./Dashboard";
import { useState } from 'react';


function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [inText, setInText] = useState("")

    const submitLogin = () => {
        if(inText === "genzresearch"){
            setLoggedIn(true)
        }else{
            alert("try again!")
            setInText("")
        }
    }    

    const handleInChange = (e) => {
        setInText(e.target.value)
    }

    const checkEnterKey = (e) => {
        if(e.key === "Enter"){
            submitLogin()
        }
    }

  return (
    <div className="App">
        {loggedIn ? 
            <Dashboard />
        : <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center", "height": "100%", "width": "100%"}}>
            <input onKeyDown={checkEnterKey} style={{"backgroundColor": "white", "lineHeight": "30px", "paddingLeft": "5px", "fontWeight": "bold"}} placeholder="What's the magic word?" value={inText} onChange={handleInChange} type="password"/>
            <button style={{"display": "flex", "cursor": "pointer","alignItems": "center", "justifyContent": "center","padding": "10px 10px", "margin": "10px", "borderRadius": "15px", "fontSize": "15px"}} onClickCapture={submitLogin}>Submit </button>
        </div>
        }
      
    </div>
  );
}

export default App;
