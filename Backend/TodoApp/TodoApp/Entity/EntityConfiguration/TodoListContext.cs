using Microsoft.EntityFrameworkCore;
using TodoApp.Entity.Entities;

namespace TodoApp.Entity.EntityConfiguration
{
    public class TodoListContext(DbContextOptions<TodoListContext> options) :
        DbContext(options)
    {
        public DbSet<Todo> Todos => Set<Todo>();
        public DbSet<User> Users => Set<User>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Description)
                    .HasMaxLength(500);

                entity.Property(e => e.IsCompleted)
                    .IsRequired();

                entity.Property(e => e.CreatedAt)
                    .HasDefaultValueSql("GETDATE()");

                entity.HasOne(t => t.User)
                    .WithMany(u => u.Todos)
                    .HasForeignKey(t => t.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.PasswordHash)
                    .IsRequired();

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
