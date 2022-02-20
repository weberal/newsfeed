<template>
  <div class="home">
    <PageTitle title="Newsfeed"/>
    
    <div class="container-sm mt-5">
      <div class="row justify-content-center">
        <div class="col-5">
          <input class="form-control me-2" type="search" placeholder="Search in Title" v-model="search">
        </div>
        <div class="col-4 d-flex ms-4">
          <label for="sortDropdown" class="col-3 col-form-label">Sort by:</label>
          <select id="sortDropdown" class="form-select" aria-label="Sort by" v-model="selectedSort">
            <option value="title ASC">Title ASC</option>
            <option value="title DESC">Title DESC</option>
            <option value="body ASC">Body ASC</option>
            <option value="body DESC">Body DESC</option>
            <option value="author ASC">Author ASC</option>
            <option value="author DESC">Author DESC</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container mt-5">
      <div class="col-3 d-flex mb-2 ms-auto">
        
      </div>
      <div v-for="(article) in filteredArticles" :key="article.id" class="row justify-content-center mb-3">
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{article.title}}</h5>
              <span class="text-muted small">by {{article.author}}</span>
              <p class="card-text mt-3">{{article.body}}</p>
            </div>
            <div class="card-footer">
              <a class="link-primary" role="button" @click="editArticle(article.id)">Edit</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-sm mt-5">
      <h4>Add new article</h4>
      <form @submit.prevent="save">
        <div class="mb-2">
          <label for="title" class="form-label">Title: </label>
          <input id="title" class="form-control" type="text" required v-model="title"/>
        </div>
        <div class="mb-2">
          <label for="body" class="form-label">Body: </label>
          <textarea id="body" class="form-control" rows="3" required v-model="body"></textarea>
        </div>
        <div class="mb-2">
          <label for="author" class="form-label">Author: </label>
          <input id="author" class="form-control" type="text" required v-model="author"/>
        </div>
        <div class="mb-2">
          <input type="hidden" v-model="id"/>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /srcj
import PageTitle from '@/components/PageTitle.vue';

export default {
  name: 'HomeView',
  components: {
    PageTitle,
  },
  methods: {
    save() {
      if ( this.id ) {
        this.$store.commit('edit', {
          id: this.id,
          title: this.title, 
          body: this.body, 
          author: this.author
        });

        this.resetInput();
      } else {
        this.addArticle();
      }
    },
    addArticle() {
      const articlesCount = this.$store.getters.getArticlesCount;
      this.$store.commit('add', {
        id: articlesCount,
        title: this.title, 
        body: this.body, 
        author: this.author
      });

      this.resetInput();
    },
    resetInput() {
      this.title = "";
      this.body = "";
      this.author = "";
      this.id = null;
    },
    editArticle(id) {
      const articleToEdit = this.$store.getters.getArticleById(id);

      this.title = articleToEdit.title;
      this.body = articleToEdit.body;
      this.author = articleToEdit.author;
      this.id = articleToEdit.id;
    }
  },
  data() {
    return {
      selectedSort: 'title ASC',
      articles: this.$store.state.articles,
      title: "",
      body: "",
      author: "",
      id: null,
      search: "",
    }
  },
  computed: {
    filteredArticles() {
      let outputArticles;

      if ( this.search ) {
        outputArticles = this.$store.getters.getArticlesByString(this.search.trim());
      } else {
        outputArticles = this.articles;
      }

      if ( !this.selectedSort ) {
        return outputArticles;
      } else {
        let sortArgs = this.selectedSort.split(' ');

        outputArticles.sort((a, b) => {
          if ( sortArgs[1] == 'ASC' ) {
            return ( (a[sortArgs[0]] == b[sortArgs[0]]) ? 0 : ( (a[sortArgs[0]] > b[sortArgs[0]]) ? 1 : -1 ) );
          }
          if ( sortArgs[1] == 'DESC' ) {
            return ( (a[sortArgs[0]] == b[sortArgs[0]]) ? 0 : ( (a[sortArgs[0]] < b[sortArgs[0]]) ? 1 : -1 ) );
          }
        });
        return outputArticles;
      }
    }
  }
}
</script>
