using api.Entities.Identity;

namespace api.Services;

public interface ITokenService
{
    string CreateToken(AppUser user);
}
