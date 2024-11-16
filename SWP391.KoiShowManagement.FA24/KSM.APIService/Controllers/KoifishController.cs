using AutoMapper;
using KSM.APIService.Helper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        public class FishModelCreate
        {
            //public Guid CompId { get; set; }

            public string VarietyId { get; set; }

            public Guid? UserId { get; set; }

            public string KoiName { get; set; }

            public int? Size { get; set; }

            public string? BirthDate { get; set; }

            public int? Age { get; set; }

            public string ImageUrl { get; set; }

            public string CertificateImageUrl { get; set; }

            public bool? Status { get; set; }
        }

        private bool IsValidDateFormat(string date, string format)
        {
            return DateTime.TryParseExact(date, format,
                                          System.Globalization.CultureInfo.InvariantCulture,
                                          System.Globalization.DateTimeStyles.None,
                                          out _);
        }


        [HttpPost]
        public async Task<IActionResult> AddNewFish(FishModelCreate model)
        {
            if (!IsValidDateFormat(model.BirthDate, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("BirthDate", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }


            var createdFish = new TblkoiFish()
            {
                KoiId = Guid.NewGuid(),
                VarietyId = model.VarietyId,
                UserId = model.UserId,
                KoiName = model.KoiName,
                Size = model.Size,
                BirthDate = string.IsNullOrEmpty(model.BirthDate) ? (DateOnly?)null : DateOnly.Parse(model.BirthDate),
                Age = model.Age,
                ImageUrl = model.ImageUrl,
                CertificateImageUrl = model.CertificateImageUrl,
                
                Status = model.Status,
            };
            try
            {

                await _koiFishRepo.CreateAsync(createdFish);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(createdFish);
        }

        //[HttpPost]
        //public async Task<IActionResult> AddNewFish(KoifishModel model)
        //{
        //    try
        //    {
        //        var newFish = _mapper.Map<TblkoiFish>(model);
        //        newFish.KoiId = Guid.NewGuid();
        //        await _koiFishRepo.CreateAsync(newFish);
        //        Guid newFishID = newFish.KoiId;
        //        var koiFish = await _koiFishRepo.GetByIDAsync(newFishID);
        //        //var koiFishModel = _mapper.Map<KoifishModel>(koiFish);
        //        return koiFish == null ? NotFound() : Ok(koiFish);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest();
        //    }
        //}


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFish(Guid id, [FromBody] FishModelCreate model)
        {
            if (!IsValidDateFormat(model.BirthDate, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("BirthDate", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }

            try
            {
                // Fetch the existing news from the database
                var existingFish = await _koiFishRepo.GetByIDAsync(id);
                if (existingFish == null)
                {
                    return NotFound("Fish not found.");
                }

                // Update the existing news with new values
                existingFish.KoiId = id;
                existingFish.VarietyId = model.VarietyId;
                existingFish.UserId = model.UserId;
                existingFish.KoiName = model.KoiName;
                existingFish.Size = model.Size;
                existingFish.BirthDate = string.IsNullOrEmpty(model.BirthDate) ? (DateOnly?)null : DateOnly.Parse(model.BirthDate);
                existingFish.Age = model.Age;
                existingFish.ImageUrl = model.ImageUrl;
                existingFish.CertificateImageUrl = model.CertificateImageUrl;
                existingFish.Status = model.Status;



                // Save the updated news
                await _koiFishRepo.UpdateAsync(existingFish);
                return Ok(existingFish);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Log exception details for debugging (optional)
                return BadRequest(ex.Message);
            }
        }


        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateFish(Guid id, [FromBody] KoifishModel model)
        //{
        //    var koiFish = await _koiFishRepo.GetByIDAsync(id);
        //    if (koiFish == null)
        //    {
        //        return NotFound();
        //    }

        //    // Update the koiFish fields from the model
        //    _mapper.Map(model, koiFish);

        //    // Set the KoiId explicitly from the route id
        //    koiFish.KoiId = id;

        //    await _koiFishRepo.UpdateAsync(koiFish);
        //    return Ok();
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFish([FromRoute] Guid id)
        {
            var koiFish = await _koiFishRepo.GetByIDAsync(id);
            if (koiFish == null)
            {
                return NotFound();
            }

            // Check conditions for Tblregistration and Tblcompetition statuses
            var registrations = await _koiFishRepo.GetRegistrationsByKoiIdAsync(id);
            foreach (var reg in registrations)
            {
                if (reg.Status == 1 && reg.Comp.Status != 2)
                {
                    // Prevent setting koi fish status to 0 if the conditions are not met
                    return BadRequest("Cannot delete this Koi fish Delete because it is in the competition.");
                }
            }

            // Set koiFish status to 0
            koiFish.Status = false;
            await _koiFishRepo.UpdateAsync(koiFish);

            // Set related entities' status to 0 or 2 as appropriate
            await _koiFishRepo.SetRelatedEntitiesStatusToInactive(id);

            return NoContent();
        }


    }
}
