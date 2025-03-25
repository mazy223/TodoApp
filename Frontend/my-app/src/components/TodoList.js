import TodoItem from "./TodoItem";


function TodoList({ todos, onEditClick, onDeleteClick, toggleCompleteStatus }) {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Status</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem 
          todo={todo} 
          key={todo.id} 
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick} 
          toggleCompleteStatus = {toggleCompleteStatus}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
