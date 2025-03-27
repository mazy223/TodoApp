using Microsoft.EntityFrameworkCore;
using TodoApp.Entity.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using TodoApp.SeedConfig;

namespace TodoApp.Entity.EntityConfiguration
{
    public class TodoListContext(DbContextOptions<TodoListContext> options) :
        IdentityDbContext<User,Role, string>(options)
    {
        public DbSet<Todo> Todos => Set<Todo>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new UserRoleConfiguration());

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
                entity.Property(e => e.FirstName)
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50);
            });
        }
    }
}
