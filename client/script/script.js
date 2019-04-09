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
    filtered: []
  },

  computed: {
   
  },

  watch: {
    search() {
      console.log(this.search);
      this.filtered = this.articles.filter(article => {
        if(this.search) {
          return article.title.match(this.search)
        }
        else
          return article.title
      })
    }
  },
  created() {
    axios
      .get(serverUrl + '/articles')
      .then(({ data }) => { 
        this.articles = data;
        this.filtered = this.articles.filter(article => {
          if(this.search) {
            return article.title.match(this.search)
          }
          else
            return article.title
        })
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    addArticle() {
      axios
        .post(serverUrl + '/articles', { title: this.title, contain: this.contain })
        .then(({ newArticle }) => {

          this.articles.push(newArticle);
          this.title = '';
          this.contain = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    displayArticle() {
      return this.articles.find(article => article.id == 1)
    }
  },
});