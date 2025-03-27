using Microsoft.AspNetCore.Identity;

namespace TodoApp.Entity.Entities
{
    public class Role : IdentityRole
    {
        public string? Description { get; set; }
    }
}
