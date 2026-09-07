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
    public class PersonController : ControllerBase, IPersonController
    {
        private readonly IPersonBusiness _personBusiness;

        public PersonController(IPersonBusiness personBusiness)
        {
            _personBusiness = personBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> SelectAll()
        {
            var result = await _personBusiness.SelectAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PersonDataDto>> GetById(int id)
        {
            var result = await _personBusiness.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect()
        {
            var result = await _personBusiness.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<PersonDataDto>> Save([FromBody] PersonDataDto entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null");
            }
            var result = await _personBusiness.Save(entity);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PersonDataDto entity)
        {
            if (entity == null || id != entity.Id)
            {
                return BadRequest("No se encontro el modulo Person");
            }
            await _personBusiness.Update(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _personBusiness.Delete(id);
            return NoContent();
        }
    }
}
