using api.Data;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Context _context;
        private readonly IAuthService _authservice;

        public AuthController(Context context, IAuthService authService)
        {
            _context = context;
            _authservice = authService;
        }
        [HttpPost]
        [Route("login")]
        public ActionResult Authenticate([FromBody] User user)
        {
            var token = _authservice.Authenticate(user);
            if (token != null)
            {
                return Ok(token);
            }
            return Unauthorized();
        }

    }
}