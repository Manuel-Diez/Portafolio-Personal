using Business.Implements;
using Business.Interface;
using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Controllers.Interface;

namespace Web.Controllers.Implements
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase, IUserController
    {
        private readonly IUserBusiness _userBusiness;

        public UserController(IUserBusiness userBusiness)
        {
            _userBusiness = userBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDataDto>>> SelectAll()
        {
            var result = await _userBusiness.SelectAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDataDto>> GetById(int id)
        {
            try
            {
                var user = await _userBusiness.GetById(id);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect()
        {
            var result = await _userBusiness.GetAllSelect();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<UserDataDto>> Save([FromBody] UserDataDto entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null");
            }

            try
            {
                var result = await _userBusiness.Save(entity);
                return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserDataDto entity)
        {
            if (entity == null || id != entity.Id)
            {
                return BadRequest("Invalid entity or ID mismatch");
            }

            try
            {
                await _userBusiness.Update(entity);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _userBusiness.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
