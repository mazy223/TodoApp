using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Application.CommandHandlers;
using TodoApp.Entity.Entities;
using TodoApp.Entity.EntityConfiguration;
using TodoApp.Entity.ItemDTOs;
using TodoApp.Helpers;

namespace TodoApp.Controllers
{
        [Route("api/auth")]
        [ApiController]
        public class AuthController : ControllerBase
        {
            private readonly TodoListContext _context;
            private readonly JwtService _jwtService;
            private readonly RegisterCommandHandler _registerCommandHandler;

            public AuthController(TodoListContext context, IConfiguration configuration, RegisterCommandHandler registerCommandHandler)
            {
                _context = context;
                _jwtService = new JwtService(configuration);
                _registerCommandHandler = registerCommandHandler;
            }

            [HttpPost("register")]
            [AllowAnonymous]
            public async Task<IResult> Register([FromBody] RegisterUserDto request)
            {
            return await _registerCommandHandler.Handle(request);
            }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserDto request)
            {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !PasswordHasher.VerifyPassword(request.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Geçersiz e-posta veya şifre." });
            }

            var token = _jwtService.GenerateToken(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, 
                Secure = true,
                SameSite = SameSiteMode.None,
            };

            Response.Cookies.Append("JwtToken", token, cookieOptions);

                return Ok(token);
        }
    }
 }
