import React, { Component } from 'react';
import './styles/vote.css'
import { Glyphicon } from 'react-bootstrap'


class Vote extends Component {

  render() {
    const { id, submit, rep, canVote } = this.props
    return (
      <div>
        {
          canVote ? <span onClick={(e) => submit(e, id, 'UP')}><Glyphicon glyph="thumbs-up" /></span> : null
        }
        <div className="vote-rep"><Glyphicon glyph="star" /> { rep }</div>
        {
          canVote ?  <span onClick={(e) => submit(e, id, 'DOWN')}><Glyphicon glyph="thumbs-down" /></span> : null
        }
      </div>
    );
  }
}

export default Vote;
