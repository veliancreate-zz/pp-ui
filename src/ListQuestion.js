import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NameWithIcon from './NameWithIcon'

class ListQuestion extends Component {

  render() {
    const { question} = this.props
    return (
      <li className="question">
        <h3><Link to={`/question/${question.id}`}>{question.title}</Link></h3>
        <p><Glyphicon glyph="star" /> {question.rating}</p>
        <NameWithIcon reputation={question.rep.user.reputation} name={question.rep.user.name} id={question.rep.id} type={'rep'}/>
        <p><Link to={`/party/${question.rep.party.id}`}>{question.rep.party.name}</Link></p>
        <p>{question.rep.constituency.name}</p>
        <ul>
          <li>Tags:</li>
          { question.Tags.map(t => <li key={`sq${t.id}`}>{ t.name }</li> )}
        </ul>
      </li>
    )
  }
}

export default ListQuestion;
