import React, { Component } from 'react';


class TextComponent extends Component {
  constructor(props){
    super(props);
    
    this.state ={
      jsonString: ''
    }
  }


  render() {
    return (
      <div>
        <textarea name="jsoninput" ref={(text) => this.texttarget=text} cols="30" rows="10"></textarea>
      </div>
    );
  }
}

export default TextComponent;