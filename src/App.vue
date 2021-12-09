<template>
  <div class="app">
    <h1>Tarefas</h1>
    <Progress-bar />
    <Todo-add />
    <Todo-list />
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'
import TodoAdd from './components/TodoAdd.vue'
import ProgressBar from './components/ProgressBar.vue'

export default {
  components: {ProgressBar, TodoAdd, TodoList},
}
</script>

<style>
body {
  background: linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115)); 
  color: white;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
}

.app h1 {
    font-weight: 500;
    margin-bottom: 5.5px;
}
</style>
