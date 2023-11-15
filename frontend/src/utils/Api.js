class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }

  getProfileId() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }

  setUserInfo(name, subtitle) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: subtitle,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }

  postCreateCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers,
      })
        .then((res) => {
          return this._getResponseData(res);
        })
        .then((res) => {
          return res.data;
        });
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
        .then((res) => {
          return this._getResponseData(res);
        })
        .then((res) => {
          return res.data;
        });
    }
  }

  updateAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  register = (password, email) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          let error = new Error(response.statusText);
          throw error;
        }
      })
      .then((res) => {
        return res;
      });
  };

  authorization = (password, email) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Ошибка: ${response.status}`);
        }
      })
      .then((res) => {
        return res;
      });
  };

  checkToken = (jwt) => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        localStorage.setItem('token', res.data._id);

        return res.data;
      });
  };

  deleteCookie() {
    return fetch(`${this._url}/users/me/exit`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return res.status;
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto-drmackey.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
