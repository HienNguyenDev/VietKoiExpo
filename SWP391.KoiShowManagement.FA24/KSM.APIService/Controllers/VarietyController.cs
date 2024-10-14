using KSM.Repository.Models;
using KSM.Repository.Repositories.UserRepository;
using KSM.Repository.Repositories.VarietyRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static KSM.APIService.Controllers.UserController;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VarietyController : Controller
    {
        private readonly IVarietyRepository _varietyRepository;
        public VarietyController(IVarietyRepository varietyRepository)
        {
            _varietyRepository = varietyRepository;
        }

        // GET: api/Variety
        [HttpGet]
        public async Task<IEnumerable<Tblvariety>> GetVariety()
        {
            return await _varietyRepository.GetAllAsync();
        }

        // GET: api/Variety/5
        [HttpGet("{id}")]
        public async Task<Tblvariety> GetVariety(string id)
        {
            var variety = await _varietyRepository.GetByIDAsync(id);
            return variety;
        }

        public class Variety
        {
            public string VarietyId { get; set; }

            public string VarietyName { get; set; }

            public string Origin { get; set; }

            public string VarietyDescription { get; set; }
        }

        [HttpPost]
        public async Task<Tblvariety> PostVariety(Variety variety)
        {
            var CreateVariety = new Tblvariety()
            {
                VarietyId = variety.VarietyId,
                VarietyName = variety.VarietyName,
                Origin = variety.Origin,
                VarietyDescription = variety.VarietyDescription
            };
            try
            {
                await _varietyRepository.CreateAsync(CreateVariety);
            }
            catch (DbUpdateConcurrencyException)
            {

            }
            return CreateVariety;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVariety(string id, Tblvariety variety)
        {
            if (!id.Equals(variety.VarietyId))
            {
                return BadRequest();
            }

            try
            {
                await _varietyRepository.UpdateAsync(variety);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VarietyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool VarietyExists(string id)
        {
            return _varietyRepository.GetByIDAsync(id) != null;
        }

        // DELETE: api/Variety/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVariety(string id)
        {
            var variety = await _varietyRepository.GetByIDAsync(id);
            if (variety == null)
            {
                return NotFound();
            }

            await _varietyRepository.DeleteAsync(variety);

            return NoContent();
        }
    }
}
