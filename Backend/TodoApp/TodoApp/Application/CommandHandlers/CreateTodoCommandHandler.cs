using System.Security.Claims;
using TodoApp.Entity.Entities;
using TodoApp.Entity.EntityConfiguration;
using TodoApp.Entity.ItemDTOs;

namespace TodoApp.Application.CommandHandlers
{
    public class CreateTodoCommandHandler
    {
        private readonly TodoListContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly string branchTest;

        public CreateTodoCommandHandler(TodoListContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IResult> Handle(CreateTodoDto newTodo)
        {
            try
            {
                var userId = GetUserId();

                var todo = new Todo
                {
                    Title = newTodo.Title,
                    Description = newTodo.Description,
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow,
                    UserId = userId
                };

                _context.Todos.Add(todo);
                await _context.SaveChangesAsync();

                var todoDetails = new TodoDetailsDto
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted,
                    CreatedAt = todo.CreatedAt
                };

                
                return Results.Ok(todoDetails);
            }
            catch (UnauthorizedAccessException)
            {
                return Results.Unauthorized();
            }

            catch(Exception)
            {
                return Results.StatusCode(500);
            }
        }

        public int GetUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                throw new UnauthorizedAccessException("User not found");

            return int.Parse(userIdClaim);
        }
    } 
}
