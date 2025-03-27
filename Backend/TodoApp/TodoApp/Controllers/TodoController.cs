using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.CommandHandlers;
using TodoApp.Application.QueryHandlers;
using TodoApp.Entity.Entities;
using TodoApp.Entity.ItemDTOs;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore;
using Swashbuckle.AspNetCore.Annotations;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class TodoController : ControllerBase
    {
        private readonly CreateTodoCommandHandler _createTodoCommandHandler;
        private readonly RemoveTodoCommandHandler _removeTodoCommandHandler;
        private readonly UpdateTodoCommandHandler _updateTodoCommandHandler;
        private readonly GetTodosQueryHandler _getTodosQueryHandler;
        private readonly GetTodoByIdQueryHandler _getTodoByIdQueryHandler;
        private readonly GetAllTodosQueryHandler _getAllTodosQueryHandler;


        public TodoController(
            CreateTodoCommandHandler createTodoCommandHandler, 
            RemoveTodoCommandHandler removeTodoCommandHandler,
            UpdateTodoCommandHandler updateTodoCommandHandler,
            GetTodosQueryHandler getTodosQueryHandler,
            GetTodoByIdQueryHandler getTodoByIdQueryHandler,
            GetAllTodosQueryHandler getAllTodosQueryHandler)
        {
            _createTodoCommandHandler = createTodoCommandHandler;
            _removeTodoCommandHandler = removeTodoCommandHandler;
            _updateTodoCommandHandler = updateTodoCommandHandler;
            _getTodosQueryHandler = getTodosQueryHandler;
            _getTodoByIdQueryHandler = getTodoByIdQueryHandler;
            _getAllTodosQueryHandler = getAllTodosQueryHandler;
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<IResult> GetAllTodos()
        {
            return await _getTodosQueryHandler.Handle();
        }

        [HttpGet("getAll")]
        [Authorize(Roles = "Admin")]
        

        public async Task<IResult> GetAllUsersTodos()
        {
            return await _getAllTodosQueryHandler.Handle();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IResult> GetTodoById(int id)
        {
            return await _getTodoByIdQueryHandler.Handle(id);
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IResult> Create([FromBody] CreateTodoDto req)
        {
            return await _createTodoCommandHandler.Handle(req);

        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IResult> Delete(int id)
        {
            return await _removeTodoCommandHandler.Handle(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IResult> Update([FromBody] UpdateTodoDto req,int id)
        {
            return await _updateTodoCommandHandler.Handle(req,id);
        }
    }
}
