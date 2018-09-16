import React, { Component } from 'react';
import FormErrors from './FormErrors'
import './styles/checkbox.css'
import { Glyphicon } from 'react-bootstrap'
import './styles/creators.css'
import './styles/ask.css'
import './styles/global.css'

// comment answer, comment question, answer
class AskQuestion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: '',
      title: '',
      tags: [],
      errors: [],
      search: '',
      mp: null,
      searchMps: [],
    }
    this.getMp = this.getMp.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectMp = this.selectMp.bind(this)
    this.clearMP = this.clearMP.bind(this)
  }

  componentDidMount() {
    const { api } = this.props

    api.getTags()
      .then(tags => {
        this.setState({
          ...this.state,
          tags,
        })
      })
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox(e) {
    const v = e.target.value
    if (this.selectedCheckboxes.has(v) && !e.target.checked) {
      this.selectedCheckboxes.delete(v);
    } else {
      this.selectedCheckboxes.add(v);
    }
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault()
    const { api } = this.props

    const errors = []
    const tags = [ ...this.selectedCheckboxes ]

    if (!tags.length) {
      errors.push('Please add at least one tag')
    }
    if (!this.state.title) {
      errors.push('Please add a title')
    }
    if (!this.state.content) {
      errors.push('Please add content')
    }

    if(!this.state.mp) {
      errors.push('Please add an MP')
    }

    if (errors.length) {
      this.setState({
        ...this.state,
        errors,
      })
      return
    }

    api.createQuestion({
      title: this.state.title,
      body: this.state.content,
      tags,
      posedTo: this.state.mp.id,
    })
      .then(q => {
        this.props.history.replace(`/question/${q.id}`)
      })

  }

  handleTitle(event) {
    this.setState({
      ...this.state,
      title: event.target.value
    });
  }

  handleContent(event) {
    this.setState({
      ...this.state,
      content: event.target.value
    });
  }

  getMp(e) {
    const { api } = this.props

    e.preventDefault()
    api.getMP(this.state.search)
      .then(searchMps => {
        this.setState({
          ...this.state,
          searchMps,
        })
      })

  }

  handleSearch(event) {
    this.setState({
      ...this.state,
      search: event.target.value
    });
  }

  selectMp(mp) {
    this.setState({
      ...this.state,
      mp,
    })
  }

  clearMP() {
    this.setState({
      ...this.state,
      mp: null,
    })
  }

  render() {
    const { mp, searchMps } = this.state
    return (
      <div className="container">
        {
          mp ? <div>
              <p>You are asking</p>
              <p><Glyphicon glyph="star" /> { mp.user.reputation } { mp.user.name } </p>
              <p>{ mp.party.name }</p>
              <p>{ mp.constituency.name }</p>
              <button onClick={this.clearMP}>Clear MP</button>
            </div>
            : <form onSubmit={this.getMp}>
            <label>
              <h3>Search for an mp to ask by name</h3>
              <input type="text" onChange={this.handleSearch} />
            </label>
            <input type="submit" value="Search for an MP" />
            <ul>
              {
                searchMps.map(mp => <li className="mp-search" onClick={() => this.selectMp(mp)} key={mp.id}>{mp.user.name} {mp.party.name}</li>)
              }
            </ul>
          </form>
        }
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <h3>Title of your question</h3>
            <input className="search-input" type="text" onChange={this.handleTitle} />
          </div>
          <div>
            <h3>Content of your question</h3>
            <textarea className="search-input" onChange={this.handleContent}/>
          </div>
          <div className="checkbox-container">
            <h4>Add some Tags:</h4>
            {
              this.state.tags.map(t => {
                return  <label key={t.id}>
                          <input type="checkbox" onChange={this.toggleCheckbox} value={t.id} />
                          <span>{ t.name }</span>
                        </label>
              })
            }
          </div>
          <input type="submit" value="Ask question" />
        </form>
        {
          <FormErrors errors={this.state.errors} />
        }
      </div>
    )
  }
}

export default AskQuestion;
