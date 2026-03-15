using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interface
{
    public interface ICityController
    {
        Task<ActionResult<IEnumerable<City>>> SelectAll();
        Task<ActionResult<CityDataDto>> GetById(int id);
        Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect();
        Task<ActionResult<CityDataDto>> Save([FromBody] CityDataDto entity);
        Task<IActionResult> Update(int id, CityDataDto entity);
        Task<IActionResult> Delete(int id);
    }
}
