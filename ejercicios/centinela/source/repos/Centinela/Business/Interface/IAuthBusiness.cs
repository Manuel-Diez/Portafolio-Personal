using System.Threading.Tasks;
using Entity.Dto;

namespace Business.Interface
{
    public interface IAuthBusiness
    {
        Task<AuthResponseDto?> Login(LoginDto login);
    }
}
