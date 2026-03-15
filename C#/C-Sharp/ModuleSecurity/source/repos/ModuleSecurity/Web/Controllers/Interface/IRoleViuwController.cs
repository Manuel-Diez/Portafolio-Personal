using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface IRoleViuwController
    {
        Task<ActionResult<IEnumerable<RoleView>>> SelectAll();
        Task<ActionResult<RoleViewDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<RoleViewDataDto>> Save([FromBody] RoleViewDataDto entity);
        Task<IActionResult> Update(int id, RoleViewDataDto entity);
        Task<IActionResult> Delete(int id);
    }
}
