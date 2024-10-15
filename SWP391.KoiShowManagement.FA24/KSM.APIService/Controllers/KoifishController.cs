using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.KoifishRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KoifishController : ControllerBase
    {
        private readonly IKoifishRepository _koiFishRepo;
        private readonly IMapper _mapper;
        public KoifishController(IKoifishRepository repo, IMapper mapper)
        {
            _koiFishRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFishes()
        {
            try
            {
                var koiFishes = await _koiFishRepo.GetAllAsync();
                return Ok(_mapper.Map<List<KoifishModel>>(koiFishes));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFishById(string id)
        {
            var koiFish = await _koiFishRepo.GetByIDAsync(id);
            return Ok(_mapper.Map<KoifishModel>(koiFish));
            
        }

        [HttpPost]
        public async Task<IActionResult> AddNewFish(KoifishModel model)
        {
            try
            {
                var newFish = _mapper.Map<TblkoiFish>(model);
                await _koiFishRepo.CreateAsync(newFish);
                string newFishID = newFish.KoiId;
                var koiFish = await _koiFishRepo.GetByIDAsync(newFishID);
                var koiFishModel = _mapper.Map<KoifishModel>(koiFish);
                return koiFishModel == null ? NotFound() : Ok(koiFishModel);
            }
            catch (Exception ex)
            {
                return BadRequest(); 
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFish(string id, [FromBody] KoifishModel model)
        {
            if (id != model.KoiId)
            {
                return NotFound();
            }
            var updateFish = _mapper.Map<TblkoiFish>(model);
            await _koiFishRepo.UpdateAsync(updateFish);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFish([FromRoute] string id)
        {
            var deleteFish = await _koiFishRepo.GetByIDAsync(id);
            if (deleteFish == null)
            {
                return NotFound();
            }
            await _koiFishRepo.DeleteAsync(deleteFish);
            return NoContent();

        }


    }
}
