namespace TodoApp.Entity.ItemDTOs
{
    public class CreateTodoDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}
