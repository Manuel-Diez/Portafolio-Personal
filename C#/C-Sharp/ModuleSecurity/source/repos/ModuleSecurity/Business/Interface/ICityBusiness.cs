using Entity.Dto;
using Entity.Model.Security;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Business.Interface
{
    public interface ICityBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<CityDataDto>> GetAll();
        public Task<IEnumerable<DataSelectDto>> GetAllSelect();
        Task<IEnumerable<City>> SelectAll();
        Task<City> Save(CityDataDto entity);
        Task Update(CityDataDto entity);
        Task<CityDataDto> GetById(int id);
        City MapData(City city, CityDataDto entity);
    }
}
