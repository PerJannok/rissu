<template>
  <div class="protected">
    <h1>These are the ToDo:s</h1>
    <div v-for="todo of todos" :key="todo.id">
      {{todo.name}}
      {{todo.description}}
    </div>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';

export default {
  name: 'protected',
  data () {
    return {
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
}
</script>