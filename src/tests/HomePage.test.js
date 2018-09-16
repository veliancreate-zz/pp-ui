import React from 'react';
import HomePage from '../HomePage'
import SearchQuestions from '../SearchQuestions'
import { shallow } from 'enzyme'

it('renders questions if authenticated', () => {
  const div = document.createElement('div');
  const auth = {
    isAuthenticated: () => true,
    login: () => {},
  }
  const w = shallow(<HomePage auth={auth} />, div);
  const c = w.find(SearchQuestions)
  expect(c.length).toEqual(1)
})

it('renders login if not', () => {
  const auth = {
    isAuthenticated: () => false,
    login: () => {},
  }
  const w = shallow(<HomePage auth={auth} />)
  const c = w.find('h2')
  expect(c.length).toEqual(1)
})
