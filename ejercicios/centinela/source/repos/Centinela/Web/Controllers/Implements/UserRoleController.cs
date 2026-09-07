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
    public class UserRoleController : ControllerBase, IUserRoleController
    {
        private readonly IUserRoleBusiness _userRoleBusiness;

        public UserRoleController(IUserRoleBusiness userRoleBusiness)
        {
            _userRoleBusiness = userRoleBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRole>>> SelectAll()
        {
            var result = await _userRoleBusiness.SelectAll();
            return Ok(result);
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect()
        {
            var result = await _userRoleBusiness.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserRoleDataDto>> GetById(int id)
        {
            var result = await _userRoleBusiness.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<UserRoleDataDto>> Save([FromBody] UserRoleDataDto entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null");
            }
            var result = await _userRoleBusiness.Save(entity);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserRoleDataDto entity)
        {
            if (entity == null || id != entity.Id)
            {
                return BadRequest();
            }
            await _userRoleBusiness.Update(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userRoleBusiness.Delete(id);
            return NoContent();
        }
    }
}
