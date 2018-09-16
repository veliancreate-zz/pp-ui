import React, { Component } from 'react';

class Party extends Component {

  constructor (props) {
    super(props)
    this.state = {
      party: null,
      questionsCount: 0,
      constituencyCount: 0
    }
  }

  componentDidMount() {
    const { api } = this.props

    api.getPartyActivity(this.props.match.params.id)
      .then(data => {
        this.setState({
          ...this.state,
          party: data.party,
          questionsCount: data.questionsCount,
          constituencyCount: data.constituencyCount,
        })
      })

  }

  render() {
    const { party, questionsCount, constituencyCount } = this.state

    return (
      <div className="container">
        {
          party ?
            <div>
              <h1>Party Profile</h1>
              <h2>{ party.name } </h2>
              <h3>Questions: { questionsCount }</h3>
              <h3>Reps count: { constituencyCount }</h3>
            </div>
          : null
        }
      </div>
    )
  }
}

export default Party;
