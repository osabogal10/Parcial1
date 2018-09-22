import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import Graph from './Graph';

class ListComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cardAuthor: 'Autor',
      CardTitle: 'Visualización #',
      modal: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    })
  }

  render () {
    return (
      <div>
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
          <CardTitle>{this.props.title}</CardTitle>
          <CardText>Por: {this.props.author}</CardText>
          <Button onClick={this.toggle}>Abrir</Button>
          <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
            <ModalBody>
            <Graph spec={this.props.cardSpec} data={this.props.cardData}/>
            <p>Hecho por: {this.props.author}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Card>
      </div>
    )
  }
}

export default ListComponent
