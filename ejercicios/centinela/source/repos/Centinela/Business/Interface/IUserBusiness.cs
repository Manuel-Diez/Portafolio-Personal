using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Business.Interface
{
    public interface IUserBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<UserDataDto>> GetAll();
        Task<IEnumerable<DataSelectDto>> GetAllSelect();
        public Task<IEnumerable<User>> SelectAll();
        Task<User> Save(UserDataDto entity);
        Task Update(UserDataDto entity);
        Task<UserDataDto> GetById(int id);
        User MapData(User user, UserDataDto entity);
    }
}
