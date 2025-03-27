namespace TodoApp.Entity.Entities
{
    public class Todo
    {
        public int Id { get; set; }

        public required string Title { get; set; }

        public string? Description { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; }

        public User? User { get; set; }
    }

}
