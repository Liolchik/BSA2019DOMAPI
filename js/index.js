'use strict';
const api = {
  baseUrl: 'https://api.myjson.com/bins/152f9j',

  getPosts(id = "") {
    return fetch(`${this.baseUrl}${id}`, {
      method: 'GET',
    })
      .then(response => {
        if (response.ok) return response.json();

        throw new Error(`Error while fetching: ${response.statusText}`);
      })
      .catch(error => console.log('ERROR: ', error));
  },

};

document.addEventListener('DOMContentLoaded', () => {
    const refs = selectRefs();

  refs.GetAllPosts.addEventListener('submit', handleGetAllPosts);

  function handleGetAllPosts(event) {
    event.preventDefault();

    api.getPosts().then(posts => {
      let data = posts.data;
      const markup = data.reduce(
        (acc, post) => acc + createPostsMarkup(post),
        '',
      );

      refs.reply.innerHTML = markup;
    });
  }
  function createPostsMarkup({ title, description, image, createdAt, tags}) {
    const item = `<div class="grid-item">
    <div> Title: ${title}</div> 
    <div>description: ${description}</div> 
    <div>image: ${image}</div> 
    <div> createdAt:${createdAt}</div> 
    <div>tags:${tags}</div>
    </div>`;
    return item;
  }

  function selectRefs() {
    const refs = {};

    refs.reply = document.querySelector('.reply');

    refs.GetAllPosts = document.querySelector('.js-form-get-all');

    return refs;
  }
});