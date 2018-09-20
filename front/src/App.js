import React, { Component } from 'react';
import './App.css';

import Graph from './Graph';
import TextComponent from './TextComponent';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state ={
      }
    }
    
    
    render() {
      
      return (
        <div >
          <TextComponent/>
          <Graph/>
        </div>
        );
      }
      
    }
    
    export default App;
    