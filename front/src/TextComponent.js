import React, { Component } from 'react'
import Graph from './Graph'
import { Alert, Input, Label, Form, FormGroup, Button, Container, Row, Col } from 'reactstrap'
import Papa from 'papaparse'

class TextComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      jsonSpec: {
        'data': {
          'name': 'myData'
        },
        'mark': 'bar',
        'encoding': {
          'y': { 'field': 'a', 'type': 'ordinal' },
          'x': { 'field': 'b', 'type': 'quantitative' }
        }
      },
      jsonData: undefined,
      visTitle: '',
      visAuthor: '',
      visratings: [],
      alertName: '',
      alertMessage: '',
      alertVisible: false,
      file: null
    }

    this.onFileChange = this.onFileChange.bind(this)
    this.changeData = this.changeData.bind(this)
    this.changeInput = this.changeInput.bind(this)
  }

  saveVis (event) {
    const {
      jsonSpec,
      jsonData,
      visTitle,
      visAuthor,
      visratings
    } = this.state
    event.preventDefault()
    fetch('/postVis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        spec: jsonSpec,
        data: jsonData,
        titulo: visTitle,
        autor: visAuthor,
        ratings: visratings
      })
    }).then(res => res.json())
      .then(json => {
        console.log('json', json)
        if (json.success) {
          console.log(json.message)
        } else {
          console.log('error al subir objeto.')
        }
      })
  }

  changeInput (event) {
    const target = event.target
    const value = target.value
    this.setState({
      [event.target.name]: value
    })
  }

  onFileChange (event) {
    this.setState({ file: event.target.files[0] }, () => {
      console.log(this.state.file)
      Papa.parse(this.state.file, {
        header: true,
        dinamycTiping: true,
        complete: function (results) {
          console.log(results.data)
          this.setState({ jsonData: results.data })
        }.bind(this)
      })
    })
  }

  changeData (event) {
    const target = event.target
    const value = target.value
    let validjson
    try {
      validjson = JSON.parse(value)
      this.setState({ alertVisible: false })
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e.name, e.message)
        this.setState({
          alertVisible: true,
          alertName: e.name,
          alertMessage: e.message
        })
      } else {
        console.log(e)
      }
    }
    this.setState({
      jsonData: validjson
    })
  }

  changeSpec (event) {
    const target = event.target
    const value = target.value
    let validjson
    try {
      validjson = JSON.parse(value)
      this.setState({ alertVisible: false })
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e.name, e.message)
        this.setState({
          alertVisible: true,
          alertName: e.name,
          alertMessage: e.message
        })
      } else {
        console.log(e)
      }
    }
    this.setState({
      jsonSpec: validjson
    })
  }

  render () {
    return (
      <div>
        <Container>
          <Row>
            <Col mx='auto'>
              <Graph spec={this.state.jsonSpec} data={this.state.jsonData}/>

            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <Label htmlFor="">Json Spec</Label><br/>
                <textarea onChange={(e) => this.changeSpec(e)} value={JSON.stringify(this.state.jsonSpec, null, 2)} name="jsonspec" cols="50" rows="20"></textarea>
              </div>

            </Col>
            <Col>
              <div>
                <Label htmlFor="">Json Data</Label><br/>
                <textarea onChange={(e) => this.changeData(e)} value={JSON.stringify(this.state.jsonData, null, 2)} name="jsondata" cols="50" rows="20"></textarea>
              </div>
              <Alert color='warning' isOpen={this.state.alertVisible}><strong>{this.state.alertName}</strong> - {this.state.alertMessage}</Alert>

              <Label>
                 Upload file:
                <Input type="file" onChange={this.onFileChange} />
              </Label>

            </Col>
          </Row>
          <Row>
            <Col>

              <div>
                <Form>
                  <FormGroup>
                    <Label htmlFor="">Titulo</Label>
                    <Input name ="visTitle" type="text" value={this.state.visTitle} onChange={this.changeInput}></Input>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="">Autor</Label>
                    <Input name ="visAuthor" type="text" value={this.state.visAuthor} onChange={this.changeInput}></Input>
                  </FormGroup>
                  <Button color='primary' onClick={e => this.saveVis(e)}>Guardar</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}

export default TextComponent
