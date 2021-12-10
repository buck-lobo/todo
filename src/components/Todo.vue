<template>
  <div :class="[dragging, dragEntered, 'todo', pending]" :index="index" @click="done" 
    draggable="true" 
    @dragstart="startDrag($event, todo)" 
    @dragenter="onDragEnter"
    @dragleave="onDragLeave(token)"
    @drop="onDrop($event, todo, token)" 
    @dragover.prevent 
    @dragenter.prevent
  >
      <svg xmlns="http://www.w3.org/2000/svg" class="icon pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
      <h2 class="content">{{ todo.description }}</h2>
      <span class="dismiss" :style="{backgroundColor: close}" @click="remove">X</span>
  </div>
</template>

<script>
import bus from '@/bus'
import { generateToken } from '../utils/helpers'

export default {
  props: {
    todo:{
      type: Object,
      required: true
    },
    index: Number
  },
  data(){
    return {
      drag: false,
      dragEnter: false,
      token: generateToken(10)
    }
  },
  created(){
    bus.onDoneDragging(this.token, () => {
      this.drag = false
    })
    bus.onDragLeave(this.token, () => {
      this.dragEnter = false
    })
  },
  methods: {
    done(){
      bus.done(this.todo)
    },
    remove(){
      console.log('removendo');
      bus.remove(this.index)
    },
    startDrag(event, todo) {
      this.drag = true
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('todoID', todo.id)
      event.dataTransfer.setData('todoToken', this.token)
    },
    onDragEnter(){
      this.dragEnter = true
    },
    onDragLeave(token){
      bus.dragLeave(token)
      bus.doneDragging(token)
    },
    onDrop(event, targetTodo, token){
      const todoToken = event.dataTransfer.getData('todoToken')
      const draggedTodoId = event.dataTransfer.getData('todoID')
      const draggedTodo = bus.todoList[draggedTodoId]        
      const oldTodo = bus.todoList.splice(targetTodo.id, 1, draggedTodo)[0]
      bus.doneDragging(todoToken)
      bus.dragLeave(token)
      bus.todoList.splice(draggedTodoId, 1, oldTodo)
      bus.idCorrection()
    },
  },
  computed:{
    pending(){
      return this.todo.done ? 'done' : 'pending'
    },
    close(){
      return this.todo.done ? '#0A8F08' : '#6e0000'
    },
    dragging(){
      return this.drag ? 'dragging' : ''
    },
    dragEntered(){
      return this.dragEnter ? 'dragEnter' : ''
    }
    
  }
}
</script>

<style>
@keyframes dropZone {
  from { opacity: 1; }
  to { opacity: 0.5; }
}
.todo.dragging {
  opacity: 0.2;
}

.todo.dragEnter {
  border: 2px dashed rgba(0, 0, 0, 0.4);
  animation: dropZone;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.icon {
  height: 20px;
  width: 20px;
  padding: 2px;
  align-self: flex-start;
  cursor: move
}

.todo {
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

.content {
  flex: 9;
  text-align: center;
  pointer-events: none;
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