import React, { Component } from 'react';

class Tags extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: [],
    }
    this.getSelected = this.props.getSelected.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
  }

  toggleCheckbox(e) {
    const v = e.target.value
    if (this.selectedCheckboxes.has(v) && !e.target.checked) {
      this.selectedCheckboxes.delete(v);
    } else {
      this.selectedCheckboxes.add(v);
    }
  }

  componentDidMount() {
    const { api } = this.props

    api.getTags()
      .then(tags => {
        this.setState({
          tags,
        })
      })
  }

  render() {
    const { comment } = this.props
    return (
      this.state.tags.map(t => {
        return <div key={t.id}>
                <label>
                  <input type="checkbox" onChange={this.toggleCheckbox} value={t.id} />
                  { t.name }
                </label>
              </div>
      })
    )
  }
}

export default Tags;
