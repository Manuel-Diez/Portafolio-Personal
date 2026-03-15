using Business.Interface;
using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Interface;

namespace Web.Controllers.Implements
{
    [ApiController]
    [Route("[controller]")]
    public class CityController : ControllerBase, ICityController
    {
        private readonly ICityBusiness _cityBusiness;

        public CityController(ICityBusiness cityBusiness)
        {
            _cityBusiness = cityBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> SelectAll()
        {
            var result = await _cityBusiness.SelectAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CityDataDto>> GetById(int id)
        {
            var result = await _cityBusiness.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect()
        {
            var result = await _cityBusiness.GetAllSelect();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<CityDataDto>> Save([FromBody] CityDataDto entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null");
            }
            // Verifica que State_Department no sea nulo o vacío
            if (string.IsNullOrEmpty(entity.State_Department))
            {
                return BadRequest("State_Department cannot be null or empty.");
            }
            var result = await _cityBusiness.Save(entity);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CityDataDto entity)
        {
            if (entity == null || id != entity.Id)
            {
                return BadRequest();
            }
            await _cityBusiness.Update(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _cityBusiness.Delete(id);
            return NoContent();
        }
    }
}
