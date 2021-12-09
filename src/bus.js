import Vue from 'vue'
export default new Vue({
    data: {
        todoList: []
    },
    methods: {
        getLocalStorage(){
            this.todoList = JSON.parse(localStorage.getItem('todo')) || []
            this.$emit('todoChange', this.todoList)
        },
        add(todo){
            const todoCheck = t => t.description === todo.description
            const itsNew = this.todoList.filter(todoCheck).length == 0
            if (itsNew) {
                this.todoList.push(todo)
                this.$emit('todoChange', this.todoList)
            }
        },
        done(todo){
            todo.done = !todo.done
            this.$emit('todoChange', this.todoList)
        },
        remove(index){
            this.todoList.splice(index, 1)
            this.$emit('todoChange', this.todoList)
        },
        onChange(callback){
            this.$on('todoChange', callback)
        },
    }
})