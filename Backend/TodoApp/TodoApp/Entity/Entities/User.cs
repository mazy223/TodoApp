using Microsoft.AspNetCore.Identity;

namespace TodoApp.Entity.Entities
{
    public class User : IdentityUser
    {
        public string? FirstName {get; set;}

        public string? LastName { get; set; }

        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
    }
}