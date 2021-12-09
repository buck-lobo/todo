<template>
  <div class="progress">
      <div class="progress-bar-container">
            <span>{{ percent }}%</span>
            <div class="progress-bar" :style="{width: percent + '%'}"></div>
      </div>
  </div>
</template>

<script>
import bus from '@/bus'

export default {
    data(){
        return {
            percent: 0
        }
    },
    created(){
        bus.onChange(todoList => {
            const total = todoList.length
            const done = todoList.filter( t => t.done).length
            this.percent = parseInt((done * 100) / total) || 0
            localStorage.setItem('todo', JSON.stringify(todoList))
        })
        bus.getLocalStorage()
    }
}
</script>

<style>

.progress{
    flex: 1;
    width: 80%;
    text-align: center;
}

.progress-bar-container {
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    height: 20px;
}

.progress-bar-container span {
    position: absolute;
}

.progress-bar{
    background-color: green;
    border-radius: 5px;
    height: inherit;
}
</style>