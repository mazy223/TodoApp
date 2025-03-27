using System.Security.Claims;
using TodoApp.Entity.Entities;
using TodoApp.Entity.EntityConfiguration;
using TodoApp.Entity.ItemDTOs;

namespace TodoApp.Application.CommandHandlers
{
    public class UpdateTodoCommandHandler
    {
        private readonly TodoListContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UpdateTodoCommandHandler(TodoListContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        private string GetUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                throw new UnauthorizedAccessException("User not found");

            return userIdClaim;
        }
        public async Task<IResult> Handle(UpdateTodoDto todo,int id)
        {
            try
            {
                var userId = GetUserId();

                var selectedTodo = await _context.Todos.FindAsync(id);
                if(selectedTodo is null)
                {
                    return Results.NotFound();
                }

                if(selectedTodo.UserId != userId)
                {
                    return Results.Forbid();
                }

                    selectedTodo.Title = todo.Title;
                    selectedTodo.Description = todo.Description;
                    selectedTodo.IsCompleted = todo.IsCompleted;
                    await _context.SaveChangesAsync();
                    return Results.Ok();
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
    }
}
