import React from 'react';
import Question from '../Question'
import Answer from '../Answer'
import Vote from '../Vote'
import NameWithIcon from '../NameWithIcon'
import Comment from '../Comment'

import { shallow } from 'enzyme'
import sinon from 'sinon'
import AnswerCreator from '../AnswerCreator';
import CommentCreator from '../CommentCreator'

const question = {
  id: '1234',
  rating: 1,
  title: 'title',
  content: 'content',
  userAnswers: [ {
    id: '1'
  } ],
  repAnswers: [ {
    id: '2',
  } ],
  Comments: [
    {
      id: '123',
    }
  ],
  rep: {
    user: {
      reputation: 99,
      name: 'foo',
    },
    id: '1234',
    party: {
      id: '1234',
      name: 'bar'
    },
    constituency: {
      name: 'place'
    }
  },
  user: {
    id: '1',
    reputation: 99,
    name: 'foo',
    repId: '1234',
    party: {
      id: '1234',
      name: 'bar'
    },
    constituency: {
      name: 'place'
    }
  }
}

const s = sinon.createSandbox()

const api = {
  getQuestion: () => Promise.resolve(question),
  userCanVote: () => Promise.resolve(true),
  submitVote: () => Promise.resolve(),
  canAnswer: () => true,
}

it('renders comments answers', async () => {
  const w = shallow(<Question api={api} match={{ params: { id: '' } }} />, { disableLifecycleMethods: true })
  await w.instance().componentDidMount()
  expect(w.state().canVote).toEqual(true)
  expect(w.find(NameWithIcon).length).toEqual(2)
  expect(w.find(Answer).length).toEqual(2)
  expect(w.find(Comment).length).toEqual(1)
  expect(w.find(Vote).length).toEqual(1)

})

it('shows answer creator on click', async () => {
  const w = shallow(<Question api={api} match={{ params: { id: '' } }} />, { disableLifecycleMethods: true })
  await w.instance().componentDidMount()
  const b = w.find('button').first()
  b.simulate('click')
  w.update()
  expect(w.find(AnswerCreator).length).toEqual(1)
})

it('shows comment creator on click', async () => {
  const w = shallow(<Question api={api} match={{ params: { id: '' } }} />, { disableLifecycleMethods: true })
  await w.instance().componentDidMount()
  const b = w.find('button').at(1)
  b.simulate('click')
  w.update()
  expect(w.find(CommentCreator).length).toEqual(1)
})
