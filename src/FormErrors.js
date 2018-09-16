import React, { Component } from 'react';
import './styles/errors.css'

class FormErrors extends Component {

  render() {
    const { errors } = this.props
    return (
      <ul className="errors">
        {
          errors.map(e => {
            return <li key={e}>{e}</li>
          })
        }
      </ul>
    );
  }
}

export default FormErrors;
