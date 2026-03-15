using Entity.Dto;
using Entity.Model.Security;

namespace Data.Interface
{
    public interface ICityData
    {
        public Task Delete(int id);
        public Task<IEnumerable<DataSelectDto>> GetAllSelect();
        public Task<City> GetById(int id);
        public Task<City> Save(City entity);
        public Task Update(City entity);
        public Task<City> GetByName(String city);
        public Task<IEnumerable<City>> SelectAll();
        public Task<IEnumerable<City>> GetAll();
    }
}
