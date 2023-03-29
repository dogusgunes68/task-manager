class Task {
  constructor(user, date, deadline, supervisor, task) {
    this.user = user;
    this.date = date;
    this.deadline = deadline;
    this.supervisor = supervisor;
    this.task_content = task_content;
  }

  createTask() {
    //create a task
  }
  deleteTask() {
    //delete a task
  }
  getAllTasks() {
    //list all task
  }
  getTask() {
    // get only one task
  }
}

export default Task;
