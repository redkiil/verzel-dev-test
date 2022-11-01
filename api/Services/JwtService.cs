using api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace api.Services;

public static class JwtService{
    public static string GenerateToken(User user)
    {
        var TokenHandler = new JwtSecurityTokenHandler();
        var AuthKey = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Jwt")["Key"];
        var key = Encoding.ASCII.GetBytes(AuthKey);
        var TokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new []{
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.PrimarySid, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = TokenHandler.CreateToken(TokenDescriptor);

        return TokenHandler.WriteToken(token);
    }
    public static int ValidateToken(string token)
    {
        var tk = token.Split(' ')[1];
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = (JwtSecurityToken)tokenHandler.ReadToken(tk);
        var claimValue = securityToken.Claims.Where(p => true).ToList();
        Console.WriteLine(String.Join("\n", claimValue));
        return 1;
    }
}