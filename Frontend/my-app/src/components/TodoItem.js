function TodoItem({ todo, onEditClick, onDeleteClick, toggleCompleteStatus}) {

    function handleEditClick()
    {
      onEditClick(todo)
    }

    function handleDeleteClick()
    {
      onDeleteClick(todo)
    }

    function handleCompleteStatus()
    {
      toggleCompleteStatus(todo);
    }

    function formatDate(dateString) {
      const date = new Date(dateString); // Tarih string'ini Date objesine dönüştür
      return date.toLocaleDateString(); // Yalnızca tarihi alır, yerel formatta
    }
    
    return (
      
      <tr style={{textDecoration: todo.completeStatus ? "line-through" : "none"}}>
        <td>
          <span className="custom-checkbox">
            <input 
              type="checkbox" 
              id={`checkbox${todo.id}`} 
              checked={todo.completeStatus ?? false}
              onChange={handleCompleteStatus}
              />
            <label htmlFor={`checkbox${todo.id}`} ></label>
          </span>
        </td>
        <td>{todo.title}</td>
        <td>{todo.description}</td>
        <td>{formatDate(todo.createdAt)}</td>
        <td>
          <button onClick={handleEditClick} className="edit" >
            <i className="material-icons" data-toggle="tooltip" title="Edit">
              &#xE254;
            </i>
          </button>
          <button onClick={handleDeleteClick}className="delete">
            <i className="material-icons" data-toggle="tooltip" title="Delete">
              &#xE872;
            </i>
          </button>
        </td>
      </tr>
    );
  }

  export default TodoItem;