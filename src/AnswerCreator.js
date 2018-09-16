import React, { Component } from 'react';
import './styles/creators.css'

// comment answer, comment question, answer
class AnswerCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    if (!this.state.content.length) {
      return
    }
    const { questionId, api } = this.props
    api.createAnswer(questionId, this.state.content)
      .then(() => {
        location.reload()
      })

  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div>
        <h4>Please write your answer below:</h4>
        <textarea onChange={this.handleChange}/>
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }
}

export default AnswerCreator;
