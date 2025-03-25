import { useState, useEffect } from "react";

function TodoModal({isOpen, todo, onClickCloseModal, onSubmit, mode = "add"}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completeStatus: false,
  });

  useEffect(() => {
    if (todo && mode === "edit") {
      setFormData(todo);
    }
  }, [todo, mode]);

  function handleChange(e) {
    // e.target'a object destructing yaptık. e.target.name = name,e.target.value=value oldu
    const { name, value } = e.target;
    // prevState reactin otomatik olarak sağladığı önceki state değeridir,yani güncellemeden
    //önceki formdata içeriğini temsil eder.
    //...(spread) operatörü ile önceki formdata değerlerini aktarır.

    //[name]:value ise [name] computed property names'i teslim eder
    //yani ordaki name yerine name,phone,email gibi e.target.name'deki değerler gelir
    //bu değerler formdatadaki propertyler ile eşleştiğinden onları değiştirir
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    onClickCloseModal();
    setFormData({
      title: "",
      description: "",
      completeStatus: false,
    });
  }

  function handleCancel() {
    onClickCloseModal();
    setFormData({
      title: "",
      description: "",
      completeStatus: false,
    });
  }


  if (!isOpen) return null;

  return (
    <>
      <div id="employeeModal" className="modal fade show">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">
                  {mode === "add" ? "Add Todo" : "Edit Todo"}
                </h4>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  x
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-default"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  {mode === "add" ? "Add" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backgrop fade show"></div>
    </>
  );
}

export default TodoModal;
