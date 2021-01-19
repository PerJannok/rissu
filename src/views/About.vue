<template>
  <div class="about">
    <div v-if="!signedIn">
      Sign in to list ToDos.
    </div>
    <div v-if="signedIn">
      These are the To Dos:
      <div v-for="todo of todos" :key="todo.id">
        {{todo.name}}
      </div>
    </div>
  </div>
</template>
<script>

import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { Auth } from 'aws-amplify'

export default {
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.signedIn = true;
      this.user = user;
    } catch (err) {
      this.signedIn = false
    }
  },
  data () {
    return {
      signedIn: false,
      user: {},
      todos: [],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await API.graphql(graphqlOperation(listTodos));
        this.todos = response.data.listTodos.items;
      }
      catch (error) {
        console.log('Error loading todos...', error);
      }
    },
  }
};
</script>
