import React, { Component } from 'react';
import ListQuestion from './ListQuestion'
import { Pager } from 'react-bootstrap'

class ListMyQuestions extends Component {

  constructor (props) {
    super(props)
    this.state = {
      myQuestions: [],
      pagination: {
        total: 0,
        page: 1,
      }
    }
    this.getPreviousPage = this.getPreviousPage.bind(this)
    this.getNextPage = this.getNextPage.bind(this)
  }

  componentDidMount() {
    const { api } = this.props

    api.getMyQuestions({ page: 1 })
      .then(data => {
        this.setState({
          ...this.state,
          myQuestions: data.questions,
          pagination: data.pagination,
        })
      })
  }

  getPreviousPage() {
    const p = this.state.pagination.page
    const page = parseInt(p) - 1
    const { api } = this.props

    api.getMyQuestions({ page })
      .then(data => {
        this.setState({
          ...this.state,
          myQuestions: data.questions,
          pagination: data.pagination,
        })
      })
  }

  getNextPage() {
    const p = this.state.pagination.page
    const page = parseInt(p) + 1
    const { api } = this.props

    api.getMyQuestions({ page })
      .then(data => {
        this.setState({
          ...this.state,
          myQuestions: data.questions,
          pagination: data.pagination,
        })
      })
  }

  render() {
    const { pagination, myQuestions } = this.state
    const offset = 20 * (parseInt(pagination.page) - 1)
    const showNext = offset + 20 <= parseInt(pagination.total)
    return (
      <div>
        {
          pagination.total > 20 && myQuestions.length ?
          <Pager>
            { pagination.page == 1 ? null : <Pager.Item onClick={() => this.getPage('prev')}>Previous</Pager.Item> }
            { showNext ? <Pager.Item onClick={this.getPage}>>Next</Pager.Item> : null }
            <p>Showing page {offset +1} - { pagination.page * 20 >= pagination.total ? pagination.total : pagination.page * 20 } of { pagination.total } </p>
          </Pager>
          : null
        }
        <ul className="questions">
          {
            this.state.myQuestions.map(mq => {
              return <ListQuestion key={`mq-${mq.id}`} question={mq}/>
            })
          }
        </ul>
      </div>
    )
  }
}

export default ListMyQuestions;
