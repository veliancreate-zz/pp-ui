import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap'

// comment answer, comment question, answer
class Rep extends Component {

  constructor (props) {
    super(props)
    this.state = {
      rep: null,
      answersCount: 0,
    }
  }

  componentDidMount() {
    const { api } = this.props

    api.getRepActivity(this.props.match.params.id)
      .then(data => {
        this.setState({
          ...this.state,
          rep: data.rep,
          answersCount: data.answersCount,
        })


        const q1 = ['Questions', ...data.questionsByTag.map(t => t.questions) ]
        const c1 = data.questionsByTag.map(t => t.name)
        this.tagChart = window.c3.generate({
          bindto: `#charts-rep-tags`,
          data: {
            columns: [
              q1,
            ],
            type: 'bar'
          },
          axis: {
            x: {
              categories: c1,
              label: 'Tag',
              type: 'category',
            }
          }
        })
      })
  }

  componentWillUnmount() {
    this.tagChart = this.tagChart.destroy()
  }

  render() {
    const { rep, answersCount } = this.state

    return (
      <div className="container">
        {
          rep ?
            <div>
              <h1>Rep Profile</h1>
              <h2>{ rep.user.name } <Glyphicon glyph="star" /> { rep.user.reputation } </h2>
              <h3>{ rep.party.name }</h3>
              <h3>Created at: { rep.user.createdAt }</h3>
              <h3>Questions answered: { answersCount }</h3>
            </div>
          : null
        }
        <h3>Questions posed to by tag</h3>
        <div id="charts-rep-tags"></div>
      </div>
    )
  }
}

export default Rep;
