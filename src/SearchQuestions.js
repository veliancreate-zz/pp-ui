import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Glyphicon, Pager } from 'react-bootstrap'
import './styles/checkbox.css'
import './styles/questions.css'
import './styles/ask.css'
import NameWithIcon from './NameWithIcon'
import ListMyQuestions from './ListMyQuestions'
import ListQuestion from './ListQuestion'

class SearchQuestions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        total: 0,
        page: 1,
      },
      title: '',
      tags: [],
      search: '',
      mp: null,
      searchMps: [],
      selectedCheckboxes: [],
      searchedQuestions: [],
    };
    this.clearMP = this.clearMP.bind(this)
    this.getMp = this.getMp.bind(this)
    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.handleTitle = this.handleTitle.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectMp = this.selectMp.bind(this)
    this.getPage = this.getPage.bind(this)
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
    const p = [ ...this.selectedCheckboxes ].filter(tag => {
      const f = this.state.tags.find(t => t.id == tag)
      return f ? true : false
    }).map(m => this.state.tags.find(t => t.id == m))
    this.setState({
      ...this.state,
      selectedCheckboxes: p,
    })
  }

  handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    const tags = this.state.selectedCheckboxes
    const title = this.state.title
    const repId = this.state.mp ? this.state.mp.id : ''
    const { api } = this.props

    api.getQuestions({ tags, title, repId, page: 1 })
      .then(data => {
        this.setState({
          ...this.state,
          searchedQuestions: data.questions,
          pagination: data.pagination,
        })
      })

  }

  handleTitle(event) {
    this.setState({
      ...this.state,
      title: event.target.value
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
      searchMps: [],
      mp,
    })
  }

  clearMP() {
    this.setState({
      ...this.state,
      mp: null,
    })
  }

  getPage(type) {
    const tags = this.state.selectedCheckboxes
    const title = this.state.title
    const repId = this.state.mp ? this.state.mp.id : ''
    const p = this.state.pagination.page
    const page = type === 'prev' ? parseInt(p) - 1 : parseInt(p) + 1
    const { api } = this.props

    api.getQuestions({ tags, title, repId, page })
      .then(data => {
        this.setState({
          ...this.state,
          searchedQuestions: data.questions,
          pagination: data.pagination,
        })
      })
  }

  render() {
    const { mp, searchMps, pagination, searchedQuestions } = this.state
    const offset = 20 * (parseInt(pagination.page) - 1)
    const showNext = offset + 20 <= parseInt(pagination.total)
    return (
      <div className="container">
            <div>
              { mp ? <div>
                  <p>Searching by</p>
                  <p>{ mp.user.name } { mp.user.reputation }</p>
                  <p>{ mp.party.name }</p>
                  <p>{ mp.constituency.name }</p>
                  <button onClick={this.clearMP}>Clear MP</button>
                </div> : null
              }
            </div>
          <form onSubmit={this.getMp}>
            <label>
              Search by MP
              <input className="search-input" type="text" onChange={this.handleSearch} />
            </label>
            <input type="submit" value="Search for MP" />
            <ul>
              {
                searchMps.map(mp => <li className="mp-search" onClick={() => this.selectMp(mp)} key={mp.id}>{mp.user.name} {mp.party.name}</li>)
              }
            </ul>

          </form>
          <form onSubmit={this.handleFormSubmit}>
            <label>
              <span>Search by title</span>
              <input className="search-input" type="text" onChange={this.handleTitle} />
            </label>
            <div className="checkbox-container">
              {
                this.state.tags.map(t => {
                  return  <label key={t.id}>
                            <input type="checkbox" onChange={this.toggleCheckbox} value={t.id} />
                            <span>{ t.name }</span>
                          </label>
                })
              }
            </div>
            <input type="submit" value="Get questions" />
          </form>

          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={6}>
                <h2>Search results</h2>
                {
                  pagination.total > 20 && searchedQuestions.length ?
                    <Pager>
                      { pagination.page == 1 ? null : <Pager.Item onClick={() => this.getPage('prev')}>Previous</Pager.Item> }
                      { showNext ? <Pager.Item onClick={this.getPage}>>Next</Pager.Item> : null }
                      <p>Showing page {offset +1} - { pagination.page * 20 >= pagination.total ? pagination.total : pagination.page * 20 } of { pagination.total } </p>
                    </Pager>
                  : null
                }
                <ul className="questions">
                  {
                    searchedQuestions.map(mq => {
                      return <ListQuestion key={`search${mq.id}`} question={mq} api={this.props.api}/>
                    })
                  }
                </ul>
              </Col>
              <Col xs={12} sm={6}>
                <h2>My questions</h2>
                <ListMyQuestions api={this.props.api} />
              </Col>
            </Row>
          </Grid>
      </div>
    )
  }
}

export default SearchQuestions;
