import React from 'react';
import Answer from '../Answer'
import Vote from '../Vote'
import NameWithIcon from '../NameWithIcon'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import * as api from '../api'
import { Link } from 'react-router-dom'


const answer = {
  id: '1234',
  rating: 1,
  content: 'content',
  Comments: [
    {
      id: '123',

    }
  ],
  user: {
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

beforeEach(() => {
  s.stub(api, 'userCanVote').resolves(true)
  s.stub(api, 'submitVote').resolves()
})

afterEach(() => {
  s.restore()
})

it('renders comments and users - basic', () => {
  answer.user.type = 'BASIC'
  const w = shallow(<Answer answer={answer} />);
  const f = w.find(<Link to={'foo'}/>)
  expect(f.length).toEqual(0)
  delete answer.user.type
})

it('renders comments and users - rep', () => {
  answer.user.type = 'REP'
  const w = shallow(<Answer answer={answer} />);
  const f = w.find('p')
  expect(f.length).toEqual(1)
})

it('shows comments on click', () => {
  const w = shallow(<Answer answer={answer} />);
  w.find('button').simulate('click')
  const s = w.state()
  expect(s.showComment).toEqual(true)
})

