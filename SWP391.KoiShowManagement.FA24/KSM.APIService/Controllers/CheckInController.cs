using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.CheckInRepository;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckInController : Controller
    {
        private readonly ICheckInRepository _checkInRepo;
        private readonly IMapper _mapper;
        public CheckInController(ICheckInRepository repo, IMapper mapper)
        {
            _checkInRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCheckIn()
        {
            try
            {
                var checkIns = await _checkInRepo.GetAllAsync();
                return Ok(checkIns);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCheckInById(Guid id)
        {
            var checkIn = await _checkInRepo.GetByIDAsync(id);
            return Ok(checkIn);

        }

        [HttpPost]
        public async Task<IActionResult> AddCheckIn(CheckInModel model)
        {
            try
            {
                var newCheckIn = _mapper.Map<TblcheckIn>(model);
                newCheckIn.CheckInId = Guid.NewGuid();
                await _checkInRepo.CreateAsync(newCheckIn);

                Guid newCheckInID = newCheckIn.CheckInId;
                var checkIn = await _checkInRepo.GetByIDAsync(newCheckInID);
                return checkIn == null ? NotFound() : Ok(checkIn);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCheckIn(Guid id, [FromBody] CheckInModel model)
        {
            var checkIn = await _checkInRepo.GetByIDAsync(id);
            if (checkIn == null)
            {
                return NotFound();
            }

            // Update the koiFish fields from the model
            _mapper.Map(model, checkIn);

            // Set the KoiId explicitly from the route id
            checkIn.CheckInId = id;

            await _checkInRepo.UpdateAsync(checkIn);
            return Ok();
        }
        ///////////////////////////////////////////////////////////////////////////////////
        [HttpGet("byRegistrationId/{registrationId}")]
        public async Task<IActionResult> GetCheckInByRegistrationId(Guid registrationId)
        {
            var checkIn = await _checkInRepo.GetByRegistrationIdAsync(registrationId);
            return checkIn == null ? NotFound() : Ok(checkIn);
        }

        public class CheckInUpdateModel
        {
            public int? Status { get; set; }
            public string ImageUrl { get; set; }
        }

        [HttpPut("byRegistrationId/{registrationId}")]
        public async Task<IActionResult> UpdateCheckInStatusAndImageByRegistrationId(Guid registrationId, [FromBody] CheckInUpdateModel model)
        {
            var checkIn = await _checkInRepo.GetByRegistrationIdAsync(registrationId);
            if (checkIn == null)
            {
                return NotFound();
            }

            // Update only the Status and ImageUrl fields
            checkIn.Status = model.Status;
            checkIn.ImageUrl = model.ImageUrl;

            var result = await _checkInRepo.UpdateAsync(checkIn);
            return result ? Ok(checkIn) : BadRequest();
        }


    }
}
