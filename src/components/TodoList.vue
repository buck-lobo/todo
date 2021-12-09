<template>

 <div class="todoList">
    <template v-if="todoList.length">
      <Todo v-for="(todo, i) in todoList" :key="todo.description" :todo="todo" :index="i"/>
    </template>
    <p v-else class="all-done">Sua vida está em dia :)</p>
  </div>

</template>

<script>
import Todo from './Todo.vue'
import bus from '@/bus'

export default {
    components: {Todo},
    data(){
      return {
        todoList: bus.todoList
      }
    },
}
</script>

<style>
  .todoList{
    display: flex !important;
    justify-content: center;
    flex-wrap: wrap;
  }

  .all-done {
    font-size: 1.5rem;
    color: white;

  }

</style>