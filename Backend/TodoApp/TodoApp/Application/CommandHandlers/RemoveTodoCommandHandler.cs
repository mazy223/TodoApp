using System.Security.Claims;
using TodoApp.Entity.EntityConfiguration;

namespace TodoApp.Application.CommandHandlers
{
    public class RemoveTodoCommandHandler
    {
        private readonly TodoListContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RemoveTodoCommandHandler(TodoListContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        private int GetUserId()
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
                if (todo.UserId != userId)
                {
                    return Results.Forbid();
                }

                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
                return Results.Ok();
            }
            catch (UnauthorizedAccessException)
            {
                return Results.Unauthorized();
            }

            catch (Exception)
            {
                return Results.StatusCode(500);
            }

        }
    }
}
