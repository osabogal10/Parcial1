import React, { Component } from 'react'
import ListComponent from './ListComponent'

class ListVis extends Component {
  constructor (props) {
    super(props)

    this.state = {
      listVis: []
    }
  }

  componentDidMount () {
    fetch('/getVis')
      .then((res) => {
        return res.json()
      })
      .then((json) => this.setState({ listVis: json }))
      .catch((err) => console.log(err))
  }

  render () {
    return (
      <div>
        <h1>Lista de Visualizaciones</h1>
        {this.state.listVis.map((vis) =>
          <ListComponent key={vis._id} author={vis.autor} title={vis.titulo} cardSpec={vis.spec} cardData={vis.data}/>
        )}
      </div>
    )
  }
}

export default ListVis
