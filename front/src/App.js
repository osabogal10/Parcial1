import React, { Component } from 'react'
import './App.css'
import TextComponent from './TextComponent'
import ListComponent from './ListComponent'
import { Container } from 'reactstrap'
import ListVis from './ListVis';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <div >
        <Container>
          <TextComponent/>
          <ListVis/>
        </Container>
      </div>
    )
  }
}

export default App
