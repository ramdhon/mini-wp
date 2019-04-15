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
    isLoggedIn: false,
    isRegister: false,
    jwttoken: '',
    fullName: '',
    email:'',
    password:'',
    content: '',
    title: '',
    image: '',
    file: '',
    articles: [],
    search: '',
    filtered: [],
    showSearch: false,
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
    this.getArticles();
  },

  methods: {
    moveSignin() {
      this.isRegister = false;
    },
    moveRegister() {
      this.isRegister = true;
    },
    register() {
      axios
        .post(serverUrl + '/register', {
          name: this.fullName,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.emptyRegister();
          this.isRegister = false;
        })
        .catch(err => {
          if(err.message) {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: err.message,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'internal server error (500)',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    },
    login() {
      axios
        .post(serverUrl + '/login', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.emptyRegister();
          this.jwttoken = data.token;
          this.isLoggedIn = true;
        })
        .catch(err => {
          let code = Number(err.message.slice(err.message.length-3, err.message.length));
          if(code === 401) {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'email / password incorrect',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: 'internal server error (500)',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;
    
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      // console.log(`Token: ${id_token}`);
      axios
        .post(serverUrl + '/glogin', {
          token: id_token
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.emptyRegister();
          this.jwttoken = data.token;
          this.isLoggedIn = true;
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'internal server error (500)',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        this.jwttoken = '';
        this.isLoggedIn = false;
      });
    },

    getArticles() {
      axios
        .get(serverUrl + '/articles')
        .then(({ data }) => { 
          this.articles = data;
          this.articles = this.articles.map(article => {
            article.id = article._id;
            article.createdAt = (new Date(article.createdAt)).toString();
            return article;
          })
          this.filterArticles()
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
      console.log("masuk file upload", this.file)
      this.image = this.file;
    },

    addArticle() {
      let formData = new FormData();
        formData.append('image', this.image)
        formData.append('title', this.title)
        formData.append('content', this.content)
      axios({
        method: 'post',
        url: serverUrl + '/articles',
        formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          token: this.jwttoken
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.getArticles();
          this.emptyForm();
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            position: 'center',
            type: 'error',
            title: 'internal server error (500)',
            showConfirmButton: false,
            timer: 1500
          })
        });
    },

    deleteArticle(id) {
      axios
        .delete(serverUrl + `/articles/${id}`)
        .then(() => {
          this.notification.status = true;
          this.notification.success = true;
          this.notification.message = 'success deleted';
          this.getArticles();
        })
        .catch(err => {
          this.notification.status = true;
          this.notification.success = false;
          this.notification.message = 'error deleted';
        })
    },

    emptyForm() {
      this.title = '';
      this.content = '';
    },
    emptyRegister() {
      this.name = '';
      this.email = '';
      this.password = '';
    },

    editArticle(id) {
      let found = this.filtered.find(article => article.id == id)
      this.title = found.title;
      this.content = found.content;
    },

    filterArticles() {
      this.filtered = this.articles.filter(article => {
        if(this.search) {
          this.showSearch = true;
          return article.title.toLowerCase().match(this.search.toLowerCase());
        }
        else {
          this.showSearch = false;
          return article.title;
        }
      })
    }
  },
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;

  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // console.log(`Token: ${id_token}`);
  axios
    .post(serverUrl + '/glogin', {
      token: id_token
    })
    .then(({ data }) => {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })
      app.emptyRegister();
      app.jwttoken = data.token;
      app.isLoggedIn = true;
    })
    .catch(err => {
      console.log(err);
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'internal server error (500)',
        showConfirmButton: false,
        timer: 1500
      })
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    app.isLoggedIn = false;
    app.jwttoken = '';
  });
}