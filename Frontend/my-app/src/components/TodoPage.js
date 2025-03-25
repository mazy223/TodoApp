import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import TodoModal from './TodoModal';
import Pagination from './Pagination';
import '../styles/todoPage.css';
import axiosInstance from '../utils/axiosInstance';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoPage()
{
    const token = localStorage.getItem('token');
    const [todos, setTodos] = useState([]);
    const config = {
      headers : { Authorization : `Bearer ${token}`}
    }

    useEffect(() => {
      Axios.get("https://localhost:7028/api/todo", {withCredentials: true , headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
          setTodos(res.data);
          
        })
        .catch((err) => {
          console.log("Hata oluştu");
        });
    }, []);
    
    const navigate = useNavigate();
    
      const [isAddModalOpen, setIsAddModalOpen] = useState(false);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
      const [selectedTodo, setSelectedTodo] = useState(null);
      const [selectedTodos, setSelectedTodos] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 3;
    
      const indexOfLastTodo = currentPage * itemsPerPage;
      const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
      const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    
      function openModal() {
        setIsAddModalOpen(true);
      }
    
      function closeAddModal() {
        setIsAddModalOpen(false);
      }
    
      function closeEditModal() {
        setIsEditModalOpen(false);
        setSelectedTodo(null);
      }
     /* setTodos((prevTodos) => [
                ...prevTodos,
                {
                  ...newTodoDetails,
                },
              ]);*/
      function addTodo(newTodo) {
        // let newTodoDetails = null;
        axiosInstance.post("/todo",{title: newTodo.title, description: newTodo.description},{withCredentials: true , headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
              const newTodoDetails = res.data;
              setTodos((prevTodos) => {
                const updatedTodos = [...prevTodos, newTodoDetails]; // Yeni todo'yu ekliyoruz
                const totalPages = Math.ceil(updatedTodos.length / itemsPerPage); // Toplam sayfa sayısını hesapla
    
                // Eğer mevcut sayfa, toplam sayfa sayısına eşitse (son sayfadaysak) bir sonraki sayfaya geç
                if (currentPage < Math.ceil(updatedTodos.length / itemsPerPage)) {
                    setCurrentPage(currentPage + 1); // Bir sonraki sayfaya geç
                }
    
                return updatedTodos;
            });
            })
            .catch((err) => {
                if(err.response && err.response.status === 401)
                    {
                        console.log("Unauthorized")
                    }
                else{
                    console.log("An error occurred. Please try again later.");
                }
            })
        
      }
    
      function editClick(todo) {
        setSelectedTodo(todo);
        setIsEditModalOpen(true);
      }
      function editTodo(updatedTodo) {
        axiosInstance.put(`/todo/${updatedTodo.id}`,{title: updatedTodo.title, description: updatedTodo.description, isCompleted:updatedTodo.completeStatus},{withCredentials: true , headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
              console.log("Guncelleme basarili");
              setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
              );
            })
            .catch((err) => {
              console.log("Hata olustu");
            })  
      }
    
      function deleteClick(todo) {
        const confirmed = window.confirm("Are you sure want to delete this todo?");
    
        

        if (confirmed) {
          axiosInstance.delete(`/todo/${todo.id}`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` }
          })
          .then((res) => {
              console.log("Silme basarili");
      
              setTodos((prevTodos) => {
                  const updatedTodos = prevTodos.filter((e) => e.id !== todo.id); // Güncel todo listesi
      
                  // Sayfada hiç todo kalmadıysa bir önceki sayfaya geç
                  if (updatedTodos.length > 0) {
                      const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
                      const indexOfLastTodo = currentPage * itemsPerPage;
                      const currentTodos = updatedTodos.slice(indexOfFirstTodo, indexOfLastTodo);
      
                      if (currentTodos.length === 0 && currentPage > 1) {
                          setCurrentPage((prevPage) => prevPage - 1); // Bir önceki sayfaya geç
                      }
                  }
      
                  return updatedTodos; // Güncellenmiş todo listesi geri dönüyor
              });
          })
          .catch((err) => {
              console.log("Hata oluştu", err);
          });
      }
      
      }
    
      function handleLogout() {
        const confirmed = window.confirm("Are you sure want to logout?");

        if(confirmed){
          localStorage.removeItem("token");
          navigate('/');
        }
      }
    
      function toggleCompletion(checkedTodo) {
        axiosInstance.put(`/todo/${checkedTodo.id}`,{title: checkedTodo.title, description: checkedTodo.description, isCompleted: !checkedTodo.completeStatus},{withCredentials: true , headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
              console.log("Todo isaretlendi");
              setTodos(
                todos.map((todo) =>
                  todo.id === checkedTodo.id
                    ? { ...todo, completeStatus: !todo.completeStatus }
                    : todo
                )
              );
            })
            .catch((err) => {
              console.log("Hata olustu");
            })  
      }
    
      function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
      }
    return(
        <div className="container">
        <div className="table-wrapper">
          <Header
            onClickAddTodo={openModal}
            onLogout={handleLogout}
          />
          <TodoList
            todos={currentTodos}
            onEditClick={editClick}
            onDeleteClick={deleteClick}
            selectedTodos={selectedTodos}
            setSelectedTodos={setSelectedTodos}
            toggleCompleteStatus={toggleCompletion}
          />
          <TodoModal
            isOpen={isAddModalOpen}
            onClickCloseModal={closeAddModal}
            onSubmit={addTodo}
            todo={null}
            mode="add"
          />
          <TodoModal
            isOpen={isEditModalOpen}
            onClickCloseModal={closeEditModal}
            onSubmit={editTodo}
            todo={selectedTodo}
            mode="edit"
          />
          <div className="clearfix">
            <div className="hint-text">
              Showing <b>{currentTodos.length}</b> out of <b>{todos.length}</b>{" "}
              entries
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(todos.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
}

export default TodoPage;