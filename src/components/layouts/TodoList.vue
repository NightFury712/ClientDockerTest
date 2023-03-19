<template>
  <header>
      <h1>Ed's Todo List</h1>
  </header>
  <form>
    <input type="text" class="todo-input" :value="todoInput" @change="valueChange"/>
    <button class="todo-button" @click="addTodo">
      <i class="fas fa-plus-square"></i>
    </button>
    <div class="select">
      <select name="todos" class="filter-todo" @change="filterTodo">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </div>
  </form>
  <div class="todo-container">
    <ul class="todo-list" ref="todoList">
      <li 
        class="todo-item" v-for="(item, index) in todos" :key="index"
      >
      <div class="content" v-if="item.isDisplayed">
        <div class="text" :class="item.isCompleted ? 'completed' : ''">{{item.value}}</div>
        <div class="right" :class="item.isCompleted ? 'completed' : ''">
          <button class="complete-btn" @click="compeletedTodo(index)">
            <i class="fas fa-check">

            </i>
          </button>
          <button class="trash-btn"  @click="deleteTodo(index)">
            <i class="fas fa-trash">

            </i>
          </button>
        </div>
      </div>
        
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  created() {
    // this.getTodos();
  },
  data() {
    return {
      todoInput: "",
      todos: []
    }
  },
  methods: {
    
    //Functions
    valueChange(e) {
      this.todoInput = e.target.value;
    },
    addTodo(e) {
      //Prevent natural behaviour
      e.preventDefault();
      //Create todo div
    
      this.todos.push({
        value: this.todoInput,
        isCompleted: false,
        isDisplayed: true
      });
      this.todoInput = '';
      // const todoDiv = document.createElement("div");
      // todoDiv.classList.add("todo");
      // //Create list
      // const newTodo = document.createElement("li");
      // newTodo.innerText = this.todoInput;
      // //Save to local - do this last
      // //Save to local
      // this.saveLocalTodos(this.todoInput);
      // //
      // newTodo.classList.add("todo-item");
      // todoDiv.appendChild(newTodo);
      // this.todoInput = "";
      // //Create Completed Button
      // const completedButton = document.createElement("button");
      // completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      // completedButton.classList.add("complete-btn");
      // todoDiv.appendChild(completedButton);
      // //Create trash button
      // const trashButton = document.createElement("button");
      // trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      // trashButton.classList.add("trash-btn");
      // todoDiv.appendChild(trashButton);
      // //attach final Todo
      // this.$refs.todoList.appendChild(todoDiv);
    },

    deleteTodo(index) {
      this.todos.splice(index, 1); // 2nd parameter means remove one item only
    },

    compeletedTodo(index) {
      // const item = e.target;
      // const todo = item.parentElement;
      // todo.classList.toggle("completed");
      this.todos[index].isCompleted = !this.todos[index].isCompleted;
    },

    filterTodo(e) {
      switch (e.target.value) {
        case "all":
          this.todos = this.todos.map((x) => {
            return {
              ...x,
              isDisplayed: true
            }
          });
          break;
        case "completed":
          this.todos = this.todos.map((x) => {
            return {
              ...x,
              isDisplayed: x.isCompleted
            }
          });
          break;
        case "uncompleted":
          this.todos = this.todos.map((x) => {
            return {
              ...x,
              isDisplayed: !x.isCompleted
            }
          });
          break;
      }
    },

    saveLocalTodos(todo) {
      let todos;
      if (localStorage.getItem("todos") === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    removeLocalTodos(todo) {
      let todos;
      if (localStorage.getItem("todos") === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
      }
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    },

    getTodos() {
      let todos;
      if (localStorage.getItem("todos") === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.forEach((todo) => {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        this.todoInput = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //attach final Todo
        if(this.$refs.todoList) {
          this.$refs.todoList.appendChild(todoDiv);
        }
      });
    }

  }
}
</script>

<style scoped>

header {
  font-size: 2rem;
}

header,
form {
  min-height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
form input,
form button {
  padding: 0.5rem;
  font-size: 2rem;
  border: none;
  background: white;
}
form button {
  color: #ff6f47;
  background: #f7fffe;
  cursor: pointer;
  transition: all 0.3s ease;
}
form button:hover {
  background: #ff6f47;
  color: white;
}
.todo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list {
  min-width: 30%;
  list-style: none;
}

.todo {
  margin: 0.5rem;
  background: white;
  font-size: 1.5rem;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 1s ease;
}
.filter-todo {
  padding: 1rem;
}
.todo li {
  flex: 1;
}

.trash-btn,
.complete-btn {
  background: #ff6f47;
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1rem;
}
.complete-btn {
  background: rgb(11, 212, 162);
}
.todo-item {
  padding: 0rem 0.5rem;
}

.fa-trash,
.fa-check {
  pointer-events: none;
}

.fall {
  transform: translateY(10rem) rotateZ(20deg);
  opacity: 0;
}

.completed{
  text-decoration: line-through;
  opacity: 0.5;
}

/*CUSTOM SELECTOR */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background-image: none;
}

/* Custom Select */
.select {
  margin: 1rem;
  position: relative;
  overflow: hidden;
}
select {
  color: #ff6f47;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  width: 12rem;
}
/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  background: #ff6f47;
  cursor: pointer;
  pointer-events: none;
}
/* Transition */
/*
.select:hover::after {
  transform: scale(1.5);
}
*/
.todo-list {
  max-height: 300px;
  overflow: auto;
}
.todo-list .todo-item .content {
  position: relative;
  display: flex;
  font-size: 16px;
  align-items: center;
  height: 50px;
  margin-bottom: 8px;
  background-color: #fff;
}
.todo-list .todo-item .right {
  position: absolute;
  right: 0;
}
</style>