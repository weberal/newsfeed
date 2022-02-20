import { createStore } from 'vuex'

export default createStore({
  state: {
    articles: [
      {
        id: 0,
        title: 'Test',
        body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        author: 'Max Mustermann'
      }
    ]
  },
  getters: {
    getArticleById: (state) => (i) => {
      return state.articles.find((article, index) => index == i);
    },
    getArticlesCount(state) {
      return state.articles.length;
    },
    getArticlesByString: (state) => (search) => {
      return state.articles.filter((article) => {return article.title.indexOf(search) > -1});
    },
  },
  mutations: {
    add(state, payload) {
      let article = {
        id: payload.id,
        title: payload.title,
        body: payload.body,
        author: payload.author
      };

      state.articles.push(article);
    },
    edit(state, article) {
      const index = state.articles.findIndex(a => a.id === article.id);
      state.articles[index] = article;
    }
  },
  actions: {
  },
  modules: {
  }
})
