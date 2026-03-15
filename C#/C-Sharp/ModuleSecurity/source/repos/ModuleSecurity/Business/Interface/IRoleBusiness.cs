using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Business.Interface
{
    public interface IRoleBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<RoleDataDto>> GetAll();
        public Task<IEnumerable<DataSelectDto>> GetAllSelect();
        Task<IEnumerable<Role>> SelectAll();
        Task<Role> Save(RoleDataDto entity);
        Task Update(RoleDataDto entity);
        Task<RoleDataDto> GetById(int id);
        Role MapData(Role role, RoleDataDto entity);
    }
}
