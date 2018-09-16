import React, { Component } from 'react';
import Comment from './Comment'
import Answer from './Answer'
import Vote from './Vote'
import AnswerCreator from './AnswerCreator'
import CommentCreator from './CommentCreator'
import NameWithIcon from './NameWithIcon'
import { Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import './styles/comments.css'
import './styles/global.css'
// import * as api from './api'
// import { submitVote,api. getQuestion, canAnswer, userCanVote } from './api'

class Question extends Component {

  constructor(props) {
    super(props)
    this.state = {
      question: {},
      fetched: false,
      showAnswer: false,
      showComment: false,
      canVote: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.clickAnswer = this.clickAnswer.bind(this)
    this.clickComment = this.clickComment.bind(this)
  }

  componentDidMount() {
    let q
    const { api } = this.props
    return api.getQuestion(this.props.match.params.id)
      .then(question => {
        q = question
        return api.userCanVote({
          id: question.id,
          type: 'question',
        })
      })
      .then(canVote => {
        this.setState({
          ...this.state,
          question: q,
          fetched: true,
          canVote,
        })
        return
      })
  }

  clickAnswer() {
    this.setState({
      ...this.state,
      showAnswer: !this.state.showAnswer,
    })
  }

  clickComment() {
    this.setState({
      ...this.state,
      showComment: !this.state.showComment,
    })
  }

  onSubmit(e, id, direction) {
    e.preventDefault()
    const { api } = this.props
    api.submitVote('question', id, direction).then(() => {
      location.reload()
    })
  }

  render() {
    const { question } = this.state
    const { userAnswers, Comments, repAnswers} = question
    const { api } = this.props
    const can = userAnswers ? api.canAnswer(userAnswers) : false
    return (
      <div className="container">
        { this.state.fetched ?
          <div>
            { can ? <button onClick={this.clickAnswer}>Answer</button> : null }
            {
              this.state.showAnswer ? <AnswerCreator questionId={this.state.question.id} /> : null
            }
            <div>
              <h3>
                {
                  <Vote rep={question.rating} id={question.id} submit={this.onSubmit} canVote={this.state.canVote} />
                }
                { question.title }
              </h3>
              <section>{ question.content }</section>
              <div>Asked by <NameWithIcon reputation={question.user.reputation} name={question.user.name} id={question.user.id} type={'user'}/></div>
              <div>Posed to <NameWithIcon reputation={question.rep.user.reputation} name={question.rep.user.name} id={question.rep.id} type={'rep'}/> </div>
              <button onClick={this.clickComment}>Comment</button>
              {
                this.state.showComment ? <CommentCreator parentId={this.state.question.id} type={'question'} /> : null
              }
              <ul className="comments">
                { Comments.map(c => <Comment key={c.id} comment={c} api={this.props.api} />) }
              </ul>
            </div>
            {
              repAnswers.length ? <div className="answers">
                <h2>Rep answers</h2>
                { repAnswers.map(a => <Answer key={a.id} answer={a} api={this.props.api} />) }
              </div>
              : <h2>No reps have submitted any answers yet</h2>
            }
            {
              userAnswers.length ? <div className="answers">
                <h2>User answers</h2>
                { userAnswers.map(a => <Answer key={a.id} answer={a} api={this.props.api} />) }
              </div>
              : <h2>No users have submitted any answers yet</h2>
            }
          </div>
          : 'Loading'
        }
      </div>
    );
  }
}

export default Question;
