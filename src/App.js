import React, { Component } from 'react';
import Gun from 'gun';
import 'gun/sea';
import Home from './Components/Home';
import Login from './Components/Login';
import Logout from './Components/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './bulma.min.css';
import 'draft-js/dist/Draft.css';


class App extends Component {
  constructor() {
  super();
    this.gun = Gun('https://p2p-journal-webprism.herokuapp.com/gun');
    window.gun = this.gun; //To have access to gun object in browser console

    this.user = this.gun.user().recall({sessionStorage: true});

    this.state = {
      authenticated: false
    }
  }

  componentDidMount(){
    if(this.user.is !== undefined) this.setAuth(true);
  }

  setAuth = (b) => {
    this.setState({authenticated: b})
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid is-flex is-justify-content-space-between	">
          <h1 className="title">Journal</h1>
          {this.state.authenticated && <Logout user={this.user} setAuth={this.setAuth} className="is-pulled-right"/>}
        </div>
        <br />
        <div className="container">
        {
        this.state.authenticated ? 
            <Home gun={this.gun} 
            user={this.user} 
            setAuth={this.setAuth}/> 
          : 
            <Login 
              setAuth={this.setAuth} 
              user={this.user}
            />
        }
        <ToastContainer />
        </div>
      </section>
    );
  }
}

export default App;
