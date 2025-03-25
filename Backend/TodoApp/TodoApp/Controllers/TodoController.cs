using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.CommandHandlers;
using TodoApp.Application.QueryHandlers;
using TodoApp.Entity.Entities;
using TodoApp.Entity.ItemDTOs;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly CreateTodoCommandHandler _createTodoCommandHandler;
        private readonly RemoveTodoCommandHandler _removeTodoCommandHandler;
        private readonly UpdateTodoCommandHandler _updateTodoCommandHandler;
        private readonly GetTodosQueryHandler _getTodosQueryHandler;
        private readonly GetTodoByIdQueryHandler _getTodoByIdQueryHandler;


        public TodoController(
            CreateTodoCommandHandler createTodoCommandHandler, 
            RemoveTodoCommandHandler removeTodoCommandHandler,
            UpdateTodoCommandHandler updateTodoCommandHandler,
            GetTodosQueryHandler getTodosQueryHandler,
            GetTodoByIdQueryHandler getTodoByIdQueryHandler)
        {
            _createTodoCommandHandler = createTodoCommandHandler;
            _removeTodoCommandHandler = removeTodoCommandHandler;
            _updateTodoCommandHandler = updateTodoCommandHandler;
            _getTodosQueryHandler = getTodosQueryHandler;
            _getTodoByIdQueryHandler = getTodoByIdQueryHandler;
        }

        [HttpGet]
        public async Task<IResult> GetAllTodos()
        {
            return await _getTodosQueryHandler.Handle();
        }

        [HttpGet("{id}")]
        public async Task<IResult> GetTodoById(int id)
        {
            return await _getTodoByIdQueryHandler.Handle(id);
        }

        [HttpPost]
        public async Task<IResult> Create([FromBody] CreateTodoDto req)
        {
            return await _createTodoCommandHandler.Handle(req);

        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            return await _removeTodoCommandHandler.Handle(id);
        }

        [HttpPut("{id}")]
        public async Task<IResult> Update([FromBody] UpdateTodoDto req,int id)
        {
            return await _updateTodoCommandHandler.Handle(req,id);
        }
    }
}
