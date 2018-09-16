import React, { Component } from 'react';
import Comment from './Comment'
import Vote from './Vote'
import CommentCreator from './CommentCreator'
import { Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import NameWithIcon from './NameWithIcon'
import './styles/comments.css'
import './styles/answers.css'
import './styles/global.css'


class Answer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showComment: false,
      canVote: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.clickComment = this.clickComment.bind(this)
  }

  componentDidMount() {
    const { answer, api } = this.props

    api.userCanVote({
      id: answer.id,
      type: 'answer',
    })
    .then(canVote => {
      this.setState({
        ...this.state,
        canVote,
      })
    })
  }

  onSubmit(e, id, direction) {
    e.preventDefault()
    const { api } = this.props

    api.submitVote('answer', id, direction)
      .then(() => {
        location.reload()
      })
  }

  clickComment() {
    this.setState({
      ...this.state,
      showComment: !this.state.showComment,
    })
  }

  render() {
    const { answer } = this.props
    return (
        <div className="answer">
          <div>
            <h4>
              {
                <Vote id={answer.id} rep={answer.rating} submit={this.onSubmit} canVote={this.state.canVote} />
              }
            </h4>
            <div>
            {
              answer.user.type === 'BASIC' ?
                <NameWithIcon reputation={answer.user.reputation} name={answer.user.name} id={answer.user.id} type={'user'}/>
                : <div>
                    <NameWithIcon reputation={answer.user.reputation} name={answer.user.name} id={answer.user.repId} type={'rep'}/>
                    <Link to={`/party/${answer.user.party.id}`}>{answer.user.party.name}</Link>
                    <p>{answer.user.constituency.name}</p>
                  </div>
            }
            </div>

            <section>{ answer.content }</section>
            <ul className="comments">
              { answer.Comments.map(c => <Comment key={c.id} comment={c} api={this.props.api} />) }
              <button onClick={this.clickComment}>Comment</button>
                {
                  this.state.showComment ? <CommentCreator parentId={answer.id} type={'answer'} /> : null
                }
            </ul>
          </div>
        </div>
    );
  }
}

export default Answer;
