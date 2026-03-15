using Entity.Dto;
using Entity.Model.Security;

namespace Data.Interface
{
    public interface IPersonData
    {
        public  Task Delete(int id);
        public Task<Person> GetById(int id);
        public Task<Person> Save(Person entity);
        public Task Update(Person entity);
        public Task<Person> GetByName(string document);
        public Task<IEnumerable<Person>> GetAll();
        public Task<IEnumerable<Person>> SelectAll();
        Task<IEnumerable<DataSelectDto>> GetAllSelect();
    }
}
