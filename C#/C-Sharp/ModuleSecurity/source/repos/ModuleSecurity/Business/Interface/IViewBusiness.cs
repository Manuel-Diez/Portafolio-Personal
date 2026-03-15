using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Business.Interface
{
    public interface IViewBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<ViewDataDto>> GetAll();
        Task<View> Save(ViewDataDto entity);
        Task Update(ViewDataDto entity);
        Task<IEnumerable<DataSelectDto>> GetAllSelect();
        Task<ViewDataDto> GetById(int id);
        View MapData(View view, ViewDataDto entity);
        public Task<IEnumerable<View>> SelectAll();
    }
}
