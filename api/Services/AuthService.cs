using api.Data;
using api.Models;

namespace api.Services
{
    public interface IAuthService
    {
        string Authenticate(User user);
    }
    public class AuthService : IAuthService
    {
        
        private readonly Context _context;
        public AuthService(Context context){
            _context = context;
        }
        public string Authenticate(User user)
        {
            var userz = _context.users.FirstOrDefault(x => x.Username == user.Username);
            if (userz == null)
            {
                return null;
            }
            if(HashService.CheckPassowrd(user.Password, userz.Password))
            {
                var token = JwtService.GenerateToken(userz);
                return token;
            }
            return null;
        }
    }
}