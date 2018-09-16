import React, { Component } from 'react';
import Vote from './Vote'
import { Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import NameWithIcon from './NameWithIcon'
import './styles/comments.css'
import './styles/creators.css'

class Comment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      canVote: false,
    }
  }

  componentDidMount() {
    const { comment, api } = this.props

    api.userCanVote({
      id: comment.id,
      type: 'comment',
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

    api.submitVote('comment', id, direction).then(() => {
      location.reload()
    })
  }

  render() {
    const { comment } = this.props
    return (
      <li className="comment">
        <div>
          <span>
            {
              <Vote rep={comment.rating} id={comment.id} canVote={this.state.canVote} submit={this.onSubmit.bind(this)} />
            }
          </span>
          {
          comment.user.type === 'BASIC' ?
            <NameWithIcon reputation={comment.user.reputation} name={comment.user.name} id={comment.user.id} type={'user'}/>
              : <div>
                  <NameWithIcon reputation={comment.user.reputation} name={comment.user.name} id={comment.user.rep.id} type={'rep'}/>
                  <Link to={`/party/${comment.user.rep.party.id}`}>{comment.user.rep.party.name}</Link>
                  <p>{comment.user.rep.constituency.name}</p>
                </div>
          }

          <section>{ comment.content }</section>
        </div>

      </li>
    );
  }
}

export default Comment;
