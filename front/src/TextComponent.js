import React, { Component } from 'react';


class TextComponent extends Component {
  constructor(props){
    super(props);
    
    this.state ={
      jsonString: ''
    }
  }

  change(event){
    const target = event.target;
    const value = target.value;
    this.setState({
      jsonString: value
    });
  }
  

  render() {
    return (
      <div>
        <textarea onChange={this.change} value={this.state.jsonString} name="jsoninput" ref={(text) => this.texttarget=text } cols="30" rows="10"></textarea>
      </div>
    );
  }
}

export default TextComponent;