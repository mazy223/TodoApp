using Microsoft.EntityFrameworkCore;
using TodoApp.Entity.EntityConfiguration;
using TodoApp.Entity.ItemDTOs;

namespace TodoApp.Application.QueryHandlers
{
    public class GetAllTodosQueryHandler
    {
        private readonly TodoListContext _context;

        public GetAllTodosQueryHandler(TodoListContext context)
        {
            _context = context;
        }

        public async Task<IResult> Handle()
        {
            try
            {
                var todos = await _context.Todos
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
