using System.Security.Claims;
using TodoApp.Entity.EntityConfiguration;
using TodoApp.Entity.ItemDTOs;

namespace TodoApp.Application.QueryHandlers
{
    public class GetTodoByIdQueryHandler
    {
        private readonly TodoListContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetTodoByIdQueryHandler(TodoListContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public int GetUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                throw new UnauthorizedAccessException("User not found");

            return int.Parse(userIdClaim);
        }

        public async Task<IResult> Handle(int id)
        {
            try
            {
                var userId = GetUserId();
                var todo = await _context.Todos.FindAsync(id);

                if(todo is null)
                {
                    return Results.NotFound();
                }
                if(todo.UserId != userId)
                {
                    return Results.Forbid();
                }

                return Results.Ok(new TodoDetailsDto
                {
                    Title = todo.Title,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted,
                    CreatedAt = todo.CreatedAt
                });
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
