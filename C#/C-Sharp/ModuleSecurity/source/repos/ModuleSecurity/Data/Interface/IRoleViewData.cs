using Entity;
using Entity.Dto;
using Entity.Model.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interface
{
    public interface IRoleViewData
    {
        public Task Delete(int id);
        public Task<RoleView> GetById(int id);
        public Task<RoleView> Save(RoleView entity);
        public Task Update(RoleView entity);
        public Task<RoleView> GetByName(string description);
        public Task<IEnumerable<RoleView>> GetAll();
        public Task<IEnumerable<RoleView>> SelectAll();
        Task<IEnumerable<DataSelectDto>> GetAllSelect();
    }
}
