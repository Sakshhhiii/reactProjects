// Simple task model
class Task {
    constructor(id,title, description, assignee, priority) {
      this.id=id;
      this.title = title;
      this.description = description;
      this.startDate = new Date().toISOString().slice(0, 10);
      this.endDate = null; // Only set upon completion
      this.status = "Pending"; // Default status
      this.assignee = assignee;
      this.priority = priority; // P0, P1, P2
    }
  }
  
  export default Task;
  