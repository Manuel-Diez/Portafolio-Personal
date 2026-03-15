using Business.Implements;
using Business.Interface;
using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Interface;

namespace Web.Controllers.Implements
{
    [ApiController]
    [Route("[controller]")]
    public class ModuleController : ControllerBase, IModuleController
    {
        private readonly IModuleBusiness _ModuleBusiness;

        public ModuleController(IModuleBusiness moduleBusiness)
        {
            _ModuleBusiness = moduleBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Module>>> SelectAll()
        {
            var result = await _ModuleBusiness.SelectAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModuleDataDto>> GetById(int id)
        {
            var result = await _ModuleBusiness.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect()
        {
            var result = await _ModuleBusiness.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ModuleDataDto>> Save([FromBody] ModuleDataDto entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null");
            }
            var result = await _ModuleBusiness.Save(entity);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ModuleDataDto entity)
        {
            if (entity == null || id != entity.Id)
            {
                return BadRequest();
            }
            await _ModuleBusiness.Update(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _ModuleBusiness.Delete(id);
            return NoContent();
        }
    }
}
