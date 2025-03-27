using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Entity.Entities;
using TodoApp.Entity.EntityConfiguration;
using TodoApp.Entity.ItemDTOs;
using TodoApp.Helpers;

namespace TodoApp.Application.CommandHandlers
{
    public class RegisterCommandHandler
    {
        private readonly TodoListContext _context;
        private readonly UserManager<User> _userManager;

        public RegisterCommandHandler(TodoListContext context,UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

       public async Task<IResult> Handle(RegisterUserDto request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return Results.BadRequest(new { message = "Bu e-posta adresi zaten kullanılıyor." });
            }

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = PasswordHasher.HashPassword(request.Password), // Şifreyi güvenli hale getiriyoruz
            };
            await _userManager.AddToRoleAsync(user, "user");
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Results.Ok(new { message = "Kullanıcı başarıyla kaydedildi." });
        }

        /* public async Task<IActionResult> Register([FromBody] RegisterUserDto request)
        {
            // E-posta zaten kullanılıyor mu kontrol et
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Bu e-posta adresi zaten kullanılıyor." });
            }

            // Kullanıcı oluştur ve şifreyi hashle
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = PasswordHasher.HashPassword(request.Password), // Şifreyi güvenli hale getiriyoruz
                Role = "user" // Varsayılan rol
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Kullanıcı başarıyla kaydedildi." });
        } */
    }
}
