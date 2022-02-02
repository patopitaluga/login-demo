// I'm using Vue here just to do something different.

new Vue({
  el: '#app',
  data: {
    vdLoginStep: 1,
    vdUserInfo: {
      id: '',
      avatar: '',
      age: -1,
      email: '',
      name: '',
      surname: '',
      role: '',
    },
  },
  /**
   * Triggered on mounted.
   */
  mounted: function() {
    fetch('/api/v0/users/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
      }),
    })
      .then(async(_responseRaw) => {
        const response = await _responseRaw.json();
        this.vdUserInfo.id = response.id;
        this.vdUserInfo.avatar = response.avatar;
        this.vdUserInfo.age = response.age;
        this.vdUserInfo.email = response.email;
        this.vdUserInfo.name = response.name;
        this.vdUserInfo.surname = response.surname;
        this.vdUserInfo.role = response.role;
      })
      .catch(() => {

      });
  },
  methods: {
    /**
     * Triggered when the user @click on log out button.
     */
    mtdLogOut: function() {
      window.localStorage.clear();
      window.location.replace('/login');
    },
  }
});
