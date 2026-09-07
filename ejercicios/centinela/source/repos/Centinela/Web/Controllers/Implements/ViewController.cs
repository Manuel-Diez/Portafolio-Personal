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
    public class ViewController : ControllerBase, IViewController
    {
        private readonly IViewBusiness _viewBusiness;

        public ViewController(IViewBusiness viewBusiness)
        {
            _viewBusiness = viewBusiness;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<View>>> SelectAll()
        {
            var result = await _viewBusiness.SelectAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ViewDataDto>> GetById(int id)
        {
            var result = await _viewBusiness.GetById(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("Select")]
        public async Task<ActionResult<IEnumerable<DataSelectDto>>> GetAllSelect()
        {
            var result = await _viewBusiness.GetAll();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<ViewDataDto>> Save([FromBody] ViewDataDto entity)
        {
            if (entity == null)
            {
                return BadRequest("Entity is null");
            }
            var result = await _viewBusiness.Save(entity);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ViewDataDto entity)
        {
            if (entity == null || id != entity.Id)
            {
                return BadRequest();
            }
            await _viewBusiness.Update(entity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _viewBusiness.Delete(id);
            return NoContent();
        }
    }
}
