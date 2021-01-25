<template>
  <div class="container">
    <button @click="signinFacebook" class="federatedbutton facebook"><font-awesome-icon :style="{ color: 'white' }" :icon="['fab', 'facebook']" /><p class="text">Sign in with Facebook</p></button>
    <button @click="signinGoogle" class="federatedbutton google"><font-awesome-icon :style="{ color: 'red' }" :icon="['fab', 'google']" /><p class="text greytext">Sign in with Google</p></button>
    <div class="authenticator">
    <amplify-authenticator username-alias="email">
      <amplify-sign-up
        slot="sign-up"
        username-alias="email"
        header-text="Custom Sign up for an account"
        :form-fields.prop="formFieldsSignUp"
      ></amplify-sign-up>
      <amplify-sign-in
        slot="sign-in"
        username-alias="email"
        header-text="Custom Sign in"
        :form-fields.prop="formFieldsSignIn"
      >
        <div slot="federated-buttons"></div><!-- empty div in order to hide federated button / Amplify hosted UI -->
      </amplify-sign-in>
    </amplify-authenticator>
    </div>
  </div>
</template>

<script>
import { Auth } from "@aws-amplify/auth";

export default {
  methods: {
    signinGoogle: function() {
      Auth.federatedSignIn({provider: 'Google'})
    },
    signinFacebook: function() {
      Auth.federatedSignIn({provider: 'Facebook'})
    },
  },
  name: 'auth',
  data() {
    return {
      formFieldsSignUp: [
        {
          type: 'email',
          label: 'Custom email Label',
          placeholder: 'custom email placeholder',
          required: true,
        },
        {
          type: 'password',
          label: 'Custom Password Label',
          placeholder: 'custom password placeholder',
          required: true,
        },
        {
          type: 'name',
          label: 'Custom Name Label',
          placeholder: 'Enter your name',
          required: false,
        },
      ],
      formFieldsSignIn: [

      ],
    }
  }
}
</script>

<style>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.authenticator {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5vmin;
}

.federatedbutton {
  width: 100%;
  max-width: 250px;
  margin-bottom: 10px;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  padding: 0px 15px;
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