import React, { Component } from 'react';


// comment answer, comment question, answer
class CommentCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { parentId, type, api } = this.props
    if (!this.state.content.length) {
      return
    }
    api.createComment(parentId, this.state.content, type)
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
        <h4>Please write your comment below:</h4>
        <textarea onChange={this.handleChange}/>
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }
}

export default CommentCreator;
