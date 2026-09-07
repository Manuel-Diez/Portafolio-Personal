using System.Collections.Generic;
using System.Threading.Tasks;
using Entity.Dto;
using Entity.Model.Security;

namespace Business.Interface
{
    public interface IPersonBusiness
    {
        Task Delete(int id);
        Task<IEnumerable<PersonDataDto>> GetAll();
        public Task<IEnumerable<DataSelectDto>> GetAllSelect();
        Task<IEnumerable<Person>> SelectAll();
        Task<Person> Save(PersonDataDto entity);
        Task Update(PersonDataDto entity);
        Task<PersonDataDto> GetById(int id);
        Person MapData(Person person, PersonDataDto entity);
    }
}
