using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface IModuleController
    {
        Task<ActionResult<IEnumerable<Module>>> SelectAll();
        Task<ActionResult<ModuleDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<ModuleDataDto>> Save([FromBody] ModuleDataDto entity);
        Task<IActionResult> Update(int id, ModuleDataDto entity);
        Task<IActionResult> Delete(int id);
    }
}
