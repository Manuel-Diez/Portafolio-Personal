using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Business.Interface
{
    public interface IUserRoleBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<UserRoleDataDto>> GetAll();
        Task<UserRole> Save(UserRoleDataDto entity);
        Task Update(UserRoleDataDto entity);
        Task<UserRoleDataDto> GetById(int id);
        UserRole MapData(UserRole userRole, UserRoleDataDto entity);
        public Task<IEnumerable<UserRole>> SelectAll();
    }
}
