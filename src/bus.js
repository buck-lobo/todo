import Vue from 'vue'
import {TODO_CHANGE} from './utils/events'
export default new Vue({
  data: {
    todoList: [],
  },
  methods: {
    getLocalStorage() {
      this.todoList = JSON.parse(localStorage.getItem('todo')) || []
      this.$emit(TODO_CHANGE, this.todoList)
    },
    add(todo) {
      const todoCheck = (t) => t.description === todo.description
      const itsNew = this.todoList.filter(todoCheck).length == 0
      if (itsNew) {
        this.todoList.push(todo)
        this.$emit(TODO_CHANGE, this.todoList)
      }
    },
    done(todo) {
      todo.done = !todo.done
      this.$emit(TODO_CHANGE, this.todoList)
    },
    remove(index) {
      this.todoList.splice(index, 1)
      this.$emit(TODO_CHANGE, this.todoList)
    },
    onChange(callback) {
      this.$on(TODO_CHANGE, callback)
    },
    idCorrection() {
      this.todoList.forEach((todo, i) => {
        todo.id = i
      })
      this.$emit(TODO_CHANGE, this.todoList)
    },
    doneDragging(token) {
      this.$emit(`doneDragging-${token}`)
    },
    onDoneDragging(token, callback) {
      this.$on(`doneDragging-${token}`, callback)
    },
    dragLeave(token) {
      this.$emit(`dragLeave-${token}`)
    },
    onDragLeave(token, callback) {
      this.$on(`dragLeave-${token}`, callback)
    },
  },
})
