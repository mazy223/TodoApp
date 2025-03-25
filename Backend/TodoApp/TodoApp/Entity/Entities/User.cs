namespace TodoApp.Entity.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string FirstName {get; set;}

        public required string LastName { get; set; }

        public required string Email { get; set; }

        public required string PasswordHash { get; set; }

        public required string Role { get; set; }

        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
    }
}
