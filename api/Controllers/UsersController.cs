using api.Data;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly Context _context;
        public UsersController(Context context)
        {
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<string>> CreateUser(User user)
        {
            var exists = _context.users.Any(x => x.Username == user.Username);
            if(exists)
            {
                return Conflict("Usuario com este nome já existe!");
            }
            user.Password = HashService.HashPassword(user.Password);
            _context.users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Usuario criado com sucesso! faça login");
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public  ActionResult<string> Login(User user)
        {
            var userz = _context.users.FirstOrDefault(x => x.Username == user.Username);
            if (userz == null)
            {
                return NotFound("User not found");
            }
            if(HashService.CheckPassowrd(user.Password, userz.Password))
            {
                var token = JwtService.GenerateToken(user);
                return Ok(token);
            }
            return Unauthorized("Wrong password");
        }
    }
}