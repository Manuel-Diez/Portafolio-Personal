using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface IViewController
    {
        Task<ActionResult<IEnumerable<View>>> SelectAll();
        Task<ActionResult<ViewDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<ViewDataDto>> Save([FromBody] ViewDataDto entity);
        Task<IActionResult> Update(int id, ViewDataDto entity);
        Task<IActionResult> Delete(int id);
    }
}
