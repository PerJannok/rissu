<template>
  <h1>Welcome, {{user.attributes.name}}</h1>
</template>

<script>
import { Auth } from "@aws-amplify/auth";

export default {
  name: 'Profile',
  data() {
    return {
      user: {}
    }
  },
  beforeCreate() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user
      })
      .catch(() => console.log('not signed in...'))
  }
}
</script>