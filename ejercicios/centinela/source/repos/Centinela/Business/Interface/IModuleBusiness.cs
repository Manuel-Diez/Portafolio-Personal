using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Business.Interface
{
    public interface IModuleBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<ModuleDataDto>> GetAll();
        public Task<IEnumerable<DataSelectDto>> GetAllSelect();
        Task<IEnumerable<Module>> SelectAll();
        Task<Module> Save(ModuleDataDto entity);
        Task Update(ModuleDataDto entity);
        Task<ModuleDataDto> GetById(int id);
        Module MapData(Module module, ModuleDataDto entity);
    }
}
