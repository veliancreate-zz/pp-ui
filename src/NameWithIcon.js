import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class NameWithIcon extends Component {

  render() {
    const { reputation, name, type, id } = this.props
    return (
      <p><Link to={`/${type}/${id}`}>{ name }</Link> <Glyphicon glyph="star" /> { reputation } </p>
    )
  }
}

export default NameWithIcon;
