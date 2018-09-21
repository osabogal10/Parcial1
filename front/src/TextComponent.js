import React, { Component } from 'react';
import Graph from './Graph';
import {Alert} from 'reactstrap';


class TextComponent extends Component {
  constructor(props){
    super(props);
    
    this.state ={
      jsonString: undefined,
      alertName: '',
      alertMessage: '',
      alertVisible: false
    }
    
    this.change = this.change.bind(this);
  }
  
  change(event){
    const target = event.target;
    const value = target.value;
    let validjson;
    try{
      validjson = JSON.parse(value);
      this.setState({alertVisible:false});
    }
    catch(e){
      if (e instanceof SyntaxError) {
        console.log(e.name,e.message);
        this.setState({
          alertVisible:true,
          alertName: e.name,
          alertMessage: e.message
        })
      } else {
        console.log(e);
      }
    }
    this.setState({
      jsonString: validjson
    });
  }
  
  render() {
    return (
      <div>
      <textarea onChange={(e) => this.change(e)} value={JSON.stringify(this.state.jsonString,null,2)} name="jsoninput" cols="30" rows="10"></textarea>
      <Alert color='warning' isOpen={this.state.alertVisible}><strong>{this.state.alertName}</strong> - {this.state.alertMessage}</Alert>
      <Graph data={this.state.jsonString}/>
      </div>
      );
    }
  }
  
  export default TextComponent;