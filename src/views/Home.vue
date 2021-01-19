<template>
  <div class="home">
    <div v-if="!signedIn">
      <div class="container">
        <button @click="signinFacebook" class="federatedbutton facebook"><font-awesome-icon :style="{ color: 'white' }" :icon="['fab', 'facebook']" /><p class="text">Sign in with Facebook</p></button>
        <button @click="signinGoogle" class="federatedbutton google"><font-awesome-icon :style="{ color: 'red' }" :icon="['fab', 'google']" /><p class="text greytext">Sign in with Google</p></button>
      </div>
      <amplify-authenticator :authConfig='authConfig'>
        <amplify-sign-up slot="sign-up"></amplify-sign-up>
      </amplify-authenticator>
    </div>
    <div v-if="signedIn">
      <amplify-sign-out class="signout"></amplify-sign-out>
      <h1>Hey, {{user.attributes.name}}!</h1>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus, components  } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'


export default {
  methods: {
    signinGoogle: function() {
      Auth.federatedSignIn({provider: 'Google'})
    },
    signinFacebook: function() {
      Auth.federatedSignIn({provider: 'Facebook'})
    },
  },  
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.signedIn = true;
      this.user = user;
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true;
        this.$router.push("about");
      } else {
        this.signedIn = false
      }
    });
  },
  name: "home",
  components: {
    ...components
  },
  data() {
    return {
      signedIn: false,
      user: {},
      authConfig: {
        signUpConfig: {
          header: 'Sign up for an account',
          hiddenDefaults: ['phone_number', 'username'],
          usernameAlias: 'email',
          signUpFields: [
            {
              label: 'Email',
              key: 'email',
              type: 'string',
              required: true,
              displayOrder: 0
            },
            {
              label: 'Password',
              key: 'password',
              type: 'password',
              required: true,
              displayOrder: 1
            },
            {
              label: 'Name',
              key: 'name',
              type: 'name',
              placeholder: 'Enter your full name',
              required: false,
              displayOrder: 2
            }
          ]
        },
        confirmSignUpConfig: {
          header: 'Please enter the code sent to your email'
        },
      }
    }
  }
};
</script>


<style>
.container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.federatedbutton {
  width: 100%;
  max-width: 250px;
  margin-bottom: 10px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  border-radius: 2;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, .3);
  cursor: pointer;
  outline: none;
  border: none;
  min-height: 40;
}

.facebook {
  background-color: #3b5998;
}

.text {
  color: white;
  font-size: 14;
  margin-left: 10;
  font-weight: bold;
}

.greytext {
  color: rgba(0, 0, 0, .75);
}
</style>