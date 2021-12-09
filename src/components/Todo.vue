<template>
  <div class="todo" :class="pending" :index="index" @click="done">
      <h2 class="content">{{ todo.description }}</h2>
      <span class="dismiss" :style="{backgroundColor: close}" @click="remove">X</span>
  </div>
</template>

<script>
import bus from '@/bus'

export default {
  props: {
    todo:{
      type: Object,
      required: true
    },
    index: Number
  },
  methods: {
    done(){
      bus.done(this.todo)
    },
    remove(){
      bus.remove(this.index)
    },
  },
  computed:{
    pending(){
      return this.todo.done ? 'done' : 'pending'
    },
    close(){
      return this.todo.done ? '#0A8F08' : '#6e0000'
    }
  }
}
</script>

<style>
.todo{
    display: flex;
    height: 150px;
    width: 350px;
    border-radius: 10px;
    align-items: center;
    margin: 5px;
    user-select: none;
    box-sizing: border-box;
    cursor: pointer;
    color: white;
}

.pending {
  border-left: 12px solid #6e0000;
  background-color: #cf0000;
}

.done {
  border-left: 12px solid #0A8F08;
  background-color: #4CAF50;
  color: #DDD;
}

.done .content {
  text-decoration: line-through;
}

/* .detalhe {
  height: 100%;
  flex: 0.5;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
} */

.content {
  flex: 9;
  text-align: center;
}

.dismiss {
  flex: 0.5;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  padding: 2px;
  margin-right: 3px;
  margin-top: 3px;
  font-size: 0.6rem;
  cursor: pointer;
}
</style>