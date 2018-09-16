import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap'
const uuidv4 = require('uuid/v4')

// comment answer, comment question, answer
class User extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: null,
      questionsCount: 0
    }
  }

  componentDidMount() {
    const { api } = this.props

    api.getUserActivity(this.props.match.params.id)
      .then(data => {
        this.setState({
          ...this.state,
          user: data.user,
          questionsCount: data.questionsCount,
        })


        const q1 = ['Questions', ...data.questionsByTag.map(t => t.questions) ]
        const c1 = data.questionsByTag.map(t => t.name)
        this.tagChart = window.c3.generate({
          bindto: `#charts-user-tags`,
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

        if (data.questionsCount > 0) {
          const q2 = ['Questions', ...data.questionsByParty.map(t => t.questions) ]
          const c2 = data.questionsByParty.map(t => t.partyName)
          this.partyChart = window.c3.generate({
            bindto: `#charts-user-party`,
            data: {
              columns: [
                q2,
              ],
              type: 'bar'
            },
            axis: {
              x: {
                categories: c2,
                label: 'Party',
                type: 'category',
              }
            }
          })
        }
      })
  }

  componentWillUnmount() {
    this.tagChart = this.tagChart.destroy()
    this.partyChart = this.partyChart.destroy()
  }

  render() {
    const { user, questionsCount } = this.state

    return (
      <div className="container">
        {
          user ? <div>
              <h1>User Profile</h1>
              <h2> { user.name } <Glyphicon glyph="star" /> { user.reputation } </h2>
              <h3>Created at: { user.createdAt }</h3>
              <h3>Questions asked: { questionsCount }</h3>
            </div>
          : null
        }
        <h3>Questions asked by tag</h3>
        <div id="charts-user-tags"></div>
        <h3>Questions asked by party</h3>
        <div id="charts-user-party"></div>
      </div>
    )
  }
}

export default User;
