import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';

class Graph extends Component {

  constructor(props){
    super(props);
    
    this.state ={
      spec:{
        "$schema": "https://vega.github.io/schema/vega-lite/v3.0.0-rc6.json",
        "description": "A simple bar chart with embedded data.",
        "data": {
          "name": "myData" 
        },
        "mark": "bar",
        "encoding": {
          "y": {"field": "a", "type": "ordinal"},
          "x": {"field": "b", "type": "quantitative"}
        }
      },
      myData:[
        {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
        {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
        {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}]
      }
    }
    
    componentDidMount(){
      vegaEmbed(this.div, this.state.spec)
      .catch(error => console.log(error))
			.then((res) =>  res.view.insert("myData", this.state.myData).run());
    }


  render() {
    return (
      <div ref={(div) => this.div=div}>
        </div>
    );
  }
}

export default Graph;