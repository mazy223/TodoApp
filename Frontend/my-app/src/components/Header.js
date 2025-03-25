function Header({ onClickAddTodo, onLogout}) {
  return (
    <div className="table-title">
      <div className="row">
        <div className="col-sm-6">
          <h2>
            Todo <b>Lists</b>
          </h2>
        </div>
        <div className="col-sm-6">
          <button 
            onClick={onClickAddTodo} 
            className="btn btn-success">
            <i className="material-icons">&#xE147;</i>
            <span>Add New Todo</span>
          </button>
          <button 
            className="btn btn-danger"
            onClick={onLogout}>
            <i className="material-icons">&#xE15C;</i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
