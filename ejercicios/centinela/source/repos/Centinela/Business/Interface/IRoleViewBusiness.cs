using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Business.Interface
{
    public interface IRoleViewBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<RoleViewDataDto>> GetAll();
        public Task<IEnumerable<RoleView>> SelectAll();
        Task<RoleView> Save(RoleViewDataDto entity);
        Task Update(RoleViewDataDto entity);
        Task<RoleViewDataDto> GetById(int id);
        RoleView MapData(RoleView rolView, RoleViewDataDto entity);
    }
}
