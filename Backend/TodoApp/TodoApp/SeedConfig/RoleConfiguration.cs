using Microsoft.EntityFrameworkCore;
using TodoApp.Entity.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TodoApp.SeedConfig
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasData(
                new Role
                {
                    Id = "cfbee6ed-74e3-4060-869a-6c3eaf871236",
                    Name = "User",
                    NormalizedName = "USER",
                    Description = "User role"
                },
                new Role
                {
                    Id = "558d3def-38b2-4bba-85bd-adb649322e63",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    Description = "Admin role"
                });
        }
    }
}
