using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface IPersonController
    {
        Task<ActionResult<IEnumerable<Person>>> SelectAll();
        Task<ActionResult<PersonDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<PersonDataDto>> Save([FromBody] PersonDataDto entity);
        Task<IActionResult> Update(int id, PersonDataDto entity);
        Task<IActionResult> Delete(int id);
    }
}
