using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Data.Interface
{
    public interface IViewData
    {
        Task Delete(int id);
        Task<View> GetById(int id);
        Task<View> Save(View entity);
        Task Update(View entity);
        Task<View> GetByName(string name);
        Task<IEnumerable<View>> GetAll();
        Task<IEnumerable<DataSelectDto>> GetAllSelect();
        public Task<IEnumerable<View>> SelectAll();
    }
}
