using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoApp.Entity.EntityConfiguration;
using TodoApp.Entity.ItemDTOs;

namespace TodoApp.Application.QueryHandlers
{
    public class GetTodosQueryHandler
    {
        private readonly TodoListContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public GetTodosQueryHandler(TodoListContext context, IHttpContextAccessor httpContextAccessor)
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

        public async Task<IResult> Handle()
        {

            try
            {
                var userId = GetUserId();
                var todos = await _context.Todos
                    .Where(t => t.UserId == userId)
                    .Select(t => new TodoDetailsDto
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        IsCompleted = t.IsCompleted,
                        CreatedAt = t.CreatedAt
                    })
                    .ToListAsync();
                return Results.Ok(todos);
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
