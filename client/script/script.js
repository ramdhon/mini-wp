var serverUrl = 'http://localhost:3000';
var app = new Vue({
  el: '#app',

  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  /* state */
  // data() {
  //   return {
  //     text: '',
  //   };
  // },
  data: {
    contain: '',
    title: '',
    articles: [],
    search: '',
    filtered: [],
    notification: {
      status: false,
      success: true,
      message: ''
    }
  },

  computed: {
    
  },

  watch: {
    search() {
      this.filterArticles();
    }
  },
  created() {
    axios
      .get(serverUrl + '/articles')
      .then(({ data }) => { 
        this.articles = data;
        this.filterArticles()
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    addArticle() {
      axios
        .post(serverUrl + '/articles', { title: this.title, contain: this.contain })
        .then(({ data }) => {
          this.articles.push(data);
          this.filtered.push(data);
          this.title = '';
          this.contain = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteArticle(id) {
      axios
        .delete(serverUrl + `/articles/${id}`)
        .then(() => {
          this.notification.status = true;
          this.notification.success = true;
          this.notification.message = 'success deleted';
          // this.articles = this.articles.slice(0, id);
          // this.filtered = this.filtered.slice(0, id);
        })
        .catch(err => {
          this.notification.status = true;
          this.notification.success = false;
          this.notification.message = 'error deleted';
        })
    },

    emptyForm() {
      this.title = '';
      this.contain = '';
    },

    editArticle(id) {
      let found = this.filtered.find(article => article.id == id)
      this.title = found.title;
      this.contain = found.contain;
    },

    filterArticles() {
      this.filtered = this.articles.filter(article => {
        if(this.search) {
          return article.title.toLowerCase().match(this.search.toLowerCase())
        }
        else
          return article.title
      })
    }
  },
});