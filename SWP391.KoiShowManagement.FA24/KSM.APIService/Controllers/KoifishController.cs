using AutoMapper;
using KSM.APIService.Helper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IUserRepository _userRepository;
        public KoifishController(IKoifishRepository repo, IMapper mapper, IUserRepository userRepo)
        {
            _koiFishRepo = repo;
            _mapper = mapper;
            _userRepository = userRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFishes()
        {
            try
            {
                var koiFishes = await _koiFishRepo.GetAllAsync();
                return Ok(koiFishes);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetFishesByUserId(Guid userId)
        {
            var fishes = await _koiFishRepo.GetAllByUserIdAsync(userId);
            return Ok(fishes);
        }


        [HttpGet("{koiFishId}/user")]
        public async Task<IActionResult> GetUserByKoiFishId(Guid koiFishId)
        {
            var userID = await _koiFishRepo.GetUserByKoiFishIdAsync(koiFishId);
            if (userID == null)
            {
                return NotFound(); // Or handle the case where the user is not found
            }

            var user = await _userRepository.GetByIDAsync(userID);

            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFishById(Guid id)
        {
            var koiFish = await _koiFishRepo.GetByIDAsync(id);
            return Ok(koiFish);

        }

        [HttpPost]
        public async Task<IActionResult> AddNewFish(KoifishModel model)
        {
            try
            {
                var newFish = _mapper.Map<TblkoiFish>(model);
                newFish.KoiId = Guid.NewGuid();
                await _koiFishRepo.CreateAsync(newFish);
                Guid newFishID = newFish.KoiId;
                var koiFish = await _koiFishRepo.GetByIDAsync(newFishID);
                //var koiFishModel = _mapper.Map<KoifishModel>(koiFish);
                return koiFish == null ? NotFound() : Ok(koiFish);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFish(Guid id, [FromBody] KoifishModel model)
        {
            var koiFish = await _koiFishRepo.GetByIDAsync(id);
            if (koiFish == null)
            {
                return NotFound();
            }

            // Update the koiFish fields from the model
            _mapper.Map(model, koiFish);

            // Set the KoiId explicitly from the route id
            koiFish.KoiId = id;

            await _koiFishRepo.UpdateAsync(koiFish);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFish([FromRoute] Guid id)
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
