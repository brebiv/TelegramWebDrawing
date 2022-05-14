import React from 'react';
import {Routes, Route} from "react-router-dom";

// import logo from './logo.svg';
import './App.css';
import MainMenuScreen from './components/MainMenuScreen';
import DrawingScreen from './components/DrawingScreen';
import GuessScreen from './components/GuessScreen';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showGuess: false,
    }
    this.changeScreen = this.changeScreen.bind(this);
  }

  
  changeScreen(e) {
    this.setState({showGuess: true});
  }


  render() {
    const showGuess = this.state.showGuess;
    return (
      <div>
        <Routes>
            <Route path="/" element={<MainMenuScreen />} />
            <Route path="/d" element={<DrawingScreen changeScreen={this.changeScreen}/>} />
            <Route path="/g" element={<GuessScreen />} />
        </Routes>
      </div>
    )
    // return (
    //   <div>
    //     {showGuess
    //       ? <MainScreen />
    //       :<GuessScreen />
    //     }
    //   <div>
    // )
  }
}

export default App;
