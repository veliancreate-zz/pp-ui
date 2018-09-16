import Auth from './Auth/Auth'

function handleErrors(response) {
  const a = new Auth()
  if(response.status === 401) {
    a.logout()
    return
  }
  if (!response.ok) {
    alert('Sorry an error ocurred, please try again')
    throw new Error(response.statusText)
  }
  return response;
}


const auth = function() {
  return { "Authorization": `Bearer ${localStorage.getItem('id_token')}` }
}

const content = function () {
  return { "Content-Type": "application/json; charset=utf-8" }
}

function and(is) {
  return is ? '&' : ''
}

function createQuery({ tags, title, repId, page }) {
  const tagQueries = tags.reduce((a, item, i) => {
    return `${a}${i === 0 ? '' : '&'}tags=${item.id}`
  }, '?')
  const rq = repId ? `repId=${repId}` : ''
  const tq = title ? `title=${title}` : ''

  return `${tagQueries}${and(tags.length)}${rq}${and(rq)}${tq}${and(tq)}page=${page}`
}

class Api {
  canDo(userId) {
    return localStorage.getItem('userId') === userId
  }
  canAnswer(answers) {
    if(answers.find(a => a.userId === localStorage.getItem('userId'))) {
      return false
    }
    return true
  }
  add(d) {
    return d += 1
  }
  subtract(d) {
    return d -= 1
  }
  submitVote(type, id, direction) {
    return fetch(`/${type}/${id}/vote`, {
      method: 'POST',
      headers: {
        ...content(),
        ...auth(),
      },
      body: JSON.stringify({
        direction
      })
    })
    .then(handleErrors)
  }
  getQuestion(id) {
    return fetch(`/question/${id}`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }
  getTags() {
    return fetch(`/tag`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }
  setSession() {
    return fetch(`session`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }

  createAnswer(questionId, text) {
    return fetch(`/question/${questionId}/answer`, {
      method: 'POST',
      headers: {
        ...content(),
        ...auth(),
      },
      body: JSON.stringify({
        content: text
      })
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  createQuestion({ body, title, tags, posedTo }) {
    return fetch(`/question`, {
      method: 'POST',
      headers: {
        ...content(),
        ...auth(),
      },
      body: JSON.stringify({
        content: body,
        title,
        tags,
        posedTo,
      })
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  createComment(parentId, text, type) {
    return fetch(`/${type}/${parentId}/comment`, {
      method: 'POST',
      headers: {
        ...content(),
        ...auth(),
      },
      body: JSON.stringify({
        content: text
      })
    })
    .then(handleErrors)
    .then(res => res.json())
  }




  getQuestions({ tags, title, repId, page }) {
    const q = createQuery({ tags, title, repId, page })
    return fetch(`/question${q === '?' ? '' : q}`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getMyQuestions({ page }) {
    return fetch(`/question?userId=me&page=${page}`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getMP(name) {
    return fetch(`/rep?name=${name}`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getUser(id) {
    return fetch(`/user/${id}`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getRep(id) {
    return fetch(`/rep/${id}`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getParty(id) {
    return fetch(`/party/${id}`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  userCanVote({ type, id }) {
    return fetch(`/${type}/${id}/canvote`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getUserActivity(id) {
    return fetch(`/user/${id}/activity`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getRepActivity(id) {
    return fetch(`/rep/${id}/activity`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


  getPartyActivity(id) {
    return fetch(`/party/${id}/activity`, {
      headers: {
        ...auth(),
      },
    })
    .then(handleErrors)
    .then(res => res.json())
  }


}

export default new Api()