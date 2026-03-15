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
    public interface IUserRoleData
    {
        public Task DeletedAt(int id);
        public Task<UserRole> GetById(int id);
        public Task<UserRole> Save(UserRole entity);
        public Task Update(UserRole entity);
        public Task<UserRole> GetByName(string description);
        public Task<IEnumerable<UserRole>> GetAll();
        public Task<IEnumerable<UserRole>> SelectAll();
        Task<IEnumerable<DataSelectDto>> GetAllSelect();
    }
}

