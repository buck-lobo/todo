<template>
  <div class="addTodo">
    <input type="text" 
      placeholder="Nova tarefa?" 
      class="base"
      v-model="description" 
      @keypress.enter="addTodo"
    />
    <button class="base" @click="addTodo">+</button>
  </div>
</template>

<script>
import bus from '@/bus'

export default {
  data(){
    return {
      description: ''
    }
  },
  methods:{
    addTodo(){
      const newTodoItem = {
        description: this.description,
        done: false
      }
      bus.add(newTodoItem)   
      this.description = null  
    }
  }
}
</script>

<style scoped>
.addTodo {
  margin: 20px 0px;
}

.base {
  color: white;
  font-size: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  outline: none;
  padding: 5px;
}

input.base {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px;
  width: 300px;
}

button.base {
  background-color: lightskyblue;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-left: none;
  cursor: pointer;
}

button:hover{
  background-color: rgb(30, 169, 255);
}
</style>