import HelloWorld from '../components/layouts/HelloWorld.vue'
import ToDoList from '../components/layouts/TodoList.vue'

import {createRouter, createWebHistory} from 'vue-router'


const routes = [
  { 
    path: '/', 
    redirect: '/home'
  },
  { 
    path: '/todo-list', 
    component: ToDoList, 
    name: 'ToDoList'
  },
  { 
    path: '/home', 
    component: HelloWorld, 
    name: 'HelloWorld' 
  },
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router