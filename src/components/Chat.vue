<template>
  <div class="chat">
    <form v-on:submit.prevent>
      <input v-model="form.message" placeholder="Enter your message..." />
      <button @click="sendMessage">Send</button>
    </form>
    <div v-for="message of sorted" :key="message.id">
      <div>{{ message.user }} ({{ moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}})</div>
      <div>{{ message.message }}</div>
    </div>
  </div>
</template>

<script>
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Chat } from "../models";
import moment from "moment";
import { Auth } from "aws-amplify";

export default {
  name: 'protected',
  data() {
    return {
      messages: [],
      form: {},
      subscription: undefined,
    }
  },
  computed: {
    sorted() {
      return [...this.messages].sort((a, b) => -a.createdAt.localeCompare(b.createdAt));
    }
  },
  created() {
    this.currentUser();
    //Subscribe to changes
    this.subscription = DataStore.observe(Chat).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      this.loadMessages();
    });    
  },
  destroyed() {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  },  
  methods: {
    moment: () => moment(),
    currentUser() {
      Auth.currentAuthenticatedUser().then(user => {
        this.user = user;
        this.loadMessages();
        console.log("current user");
      });
    },
    loadMessages() {
      DataStore.query(Chat, Predicates.ALL).then(messages => {
        this.messages = messages;
      });
    },
    sendMessage() {
      const { message } = this.form
      if (!message) return;
      DataStore.save(new Chat({
        user: this.user.attributes.name,
        message: message,
        createdAt: new Date().toISOString()
      })).then(() => {
        this.form = { message: '' };
        this.loadMessages();
      }).catch(e => {
        console.log('error creating message...', e);
      });
    },
  }
}
</script>