using Entity.Dto;
using Entity.Model.Security;

namespace Data.Interface
{
    public interface IModuleData
    {
        public Task Delete(int id);
        public Task<Module> GetById(int id);
        public Task<Module> Save(Module entity);
        public Task Update(Module entity);
        public Task<Module> GetByName(string description);
        public Task<IEnumerable<Module>> SelectAll();
        public Task<IEnumerable<Module>> GetAll();
        public Task<IEnumerable<DataSelectDto>> GetAllSelect();
    }
}
