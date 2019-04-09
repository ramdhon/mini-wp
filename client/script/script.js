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
    text: '',
    title: '',
    articles: []
  },

  computed: {

  },
  watch: {

  },
  created() {
    axios
      .get(serverUrl + '/articles')
      .then(({ data }) => { 
        this.articles = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    addArticle: function () {
      axios
        .post(serverUrl + '/articles', { title: this.title, text: this.title })
        .then(({ newArticle }) => {
          this.articles.push(newArticle);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
});