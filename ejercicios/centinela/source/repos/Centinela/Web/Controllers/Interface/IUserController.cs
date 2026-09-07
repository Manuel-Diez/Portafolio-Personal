using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface IUserController
    {
        Task<ActionResult<IEnumerable<UserDataDto>>> SelectAll();
        Task<ActionResult<UserDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<UserDataDto>> Save([FromBody] UserDataDto entity);
        Task<IActionResult> Update(int id, UserDataDto entity);
        Task<IActionResult> Delete(int id);

    }
}
