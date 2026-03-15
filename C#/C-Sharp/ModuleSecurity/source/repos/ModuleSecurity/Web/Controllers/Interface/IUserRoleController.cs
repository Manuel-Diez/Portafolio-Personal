using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface IUserRoleController
    {
        Task<ActionResult<IEnumerable<UserRole>>> SelectAll();
        Task<ActionResult<UserRoleDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<UserRoleDataDto>> Save([FromBody] UserRoleDataDto entity);
        Task<IActionResult> Update(int id, UserRoleDataDto entity);
        Task<IActionResult> Delete(int id);
    }
}
