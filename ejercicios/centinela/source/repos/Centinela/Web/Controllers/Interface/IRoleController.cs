using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface IRoleController
    {
        Task<ActionResult<IEnumerable<Role>>> SelectAll();
        Task<ActionResult<RoleDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<RoleDataDto>> Save([FromBody] RoleDataDto entity);
        Task<IActionResult> Update(int id, RoleDataDto entity);
        Task<IActionResult> Delete(int id);
    }
}
