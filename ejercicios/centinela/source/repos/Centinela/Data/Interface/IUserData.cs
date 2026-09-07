
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
    public interface IUserData
    {
        public Task Delete(int id);
        public Task<User> GetById(int id);
        public Task<User> Save(User entity);
        public Task Update(User entity);
        public Task<User> GetByName(string name);
        public Task<IEnumerable<User>> GetAll();
        public Task<IEnumerable<User>> SelectAll();
        Task<IEnumerable<DataSelectDto>> GetAllSelect();
    }
}
