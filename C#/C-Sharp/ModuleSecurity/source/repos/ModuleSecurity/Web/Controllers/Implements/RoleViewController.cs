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
    public class RoleViewController : ControllerBase, IRoleViuwController
    {
        private readonly IRoleViewBusiness _roleViewBusiness;

        public RoleViewController(IRoleViewBusiness roleViewBusiness)
        {
            _roleViewBusiness = roleViewBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleView>>> SelectAll()
        {
            var result = await _roleViewBusiness.SelectAll();
            return Ok(result);
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect()
        {
            var result = await _roleViewBusiness.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleViewDataDto>> GetById(int id)
        {
            var result = await _roleViewBusiness.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<RoleViewDataDto>> Save([FromBody] RoleViewDataDto entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null");
            }
            var result = await _roleViewBusiness.Save(entity);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RoleViewDataDto entity)
        {
            if (entity == null || id != entity.Id)
            {
                return BadRequest();
            }
            await _roleViewBusiness.Update(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _roleViewBusiness.Delete(id);
            return NoContent();
        }
    }
}
