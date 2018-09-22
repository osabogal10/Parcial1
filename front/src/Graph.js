import React, { Component } from 'react'
import vegaEmbed from 'vega-embed'
import { Alert } from 'reactstrap'

class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spec: {
        'data': {
          'name': 'myData'
        },
        'mark': 'bar',
        'encoding': {
          'y': { 'field': 'a', 'type': 'ordinal' },
          'x': { 'field': 'b', 'type': 'quantitative' }
        }
      },
      error: false,
      alertName: '',
      alertMessage: '',
      alertVisible: false
    }
    this.click = this.click.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  click (e) {
    this.setState({ data: this.props.data })
    vegaEmbed(this.div, this.props.spec)
      .catch(error => console.log(error))
      .then((res) => res.view.insert('myData', this.state.data).run())
  }

  handleError (bool, error) {
    if (!bool) {
      this.setState({
        alertVisible: false,
        alertName: '',
        alertMessage: ''
      })
    } else {
      console.log(error)
      if (error != null) {
        this.setState({
          error: bool,
          alertVisible: true,
          alertName: error.name,
          alertMessage: error.message
        })
      }
    }
  }

  componentWillReceiveProps () {
    this.setState({ data: this.props.data, spec: this.props.spec }, () => {
      vegaEmbed(this.div, this.props.spec)
        .catch(error => {
          // console.log(error);
          this.handleError(true, error)
          // throw error;
        })
        .then((res) => {
          if (!this.state.error) {
            res.view.insert('myData', this.props.data).run()
          } else {
            this.handleError(false, null)
            try {
              res.view.insert('myData', this.props.data).run()
            } catch (Error) {
              this.handleError(false, null)
              console.log('Error en el spec')
            }
          }
        })
    })
  }

  render () {
    return (
      <div>
        <Alert color='warning' isOpen={this.state.alertVisible}><strong>{this.state.alertName}</strong> - {this.state.alertMessage}</Alert>
        <div ref={(div) => { this.div = div }}></div>
        {/* <button onClick={(e) => this.click(e)}>renderizar</button> */}
      </div>
    )
  }
}

export default Graph
