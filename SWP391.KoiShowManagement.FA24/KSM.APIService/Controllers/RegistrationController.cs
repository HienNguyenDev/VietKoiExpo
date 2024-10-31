using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.CompCateRepository;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.PredictRepository;
using KSM.Repository.Repositories.RegistrationRepository;
using KSM.Repository.Repositories.ScoreRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IRegistrationRepository _registRepo;
        private readonly IPredictRepository _predictRepo;
        private readonly IMapper _mapper;
        private readonly IKoifishRepository _koiFishRepo;
        private readonly ICompCateRepository _compCateRepo;
        public RegistrationController(IRegistrationRepository repo, IMapper mapper, IPredictRepository predictRepo, IKoifishRepository koiFishrepo, ICompCateRepository compCateRepo)
        {
            _registRepo = repo;
            _mapper = mapper;
            _predictRepo = predictRepo;
            _koiFishRepo = koiFishrepo;
            _compCateRepo = compCateRepo;
        }

        [HttpGet("Predict")]
        public async Task<IActionResult> GetAllPredict()
        {
            try
            {
                var predict = await _predictRepo.GetAllAsync();
                return Ok(predict);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRegistration()
        {
            try
            {
                var regist = await _registRepo.GetAllAsync();
                return Ok(regist);
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpPost("Classificate/{registrationID}")]
        public async Task<IActionResult> ClassificateFishCategory(Guid registrationID)
        {
            var registration = await _registRepo.GetByIDAsync(registrationID);
            int? regisStatus = registration.Status;
            if (regisStatus == 1)
            {

                var koiFishID = await _registRepo.GetKoiFishIDByRegistIdAsync(registrationID);
                if (koiFishID == null)
                {
                    return NotFound();
                }
                var koiFish = await _koiFishRepo.GetByIDAsync(koiFishID); //Con ca de so sanh size va age de bo vao category
                var koiFishCategory = new TblcompetitionCategory();
                koiFishCategory.KoiId = koiFishID;
                koiFishCategory.CompId = await _registRepo.GetCompIDByRegistIdAsync(registrationID);
                koiFishCategory.CompetitionCategoryId = Guid.NewGuid();
                if (koiFish.Size >= 40 && koiFish.Size <= 55 && koiFish.Age >= 2 && koiFish.Age <= 3)
                {
                    koiFishCategory.CategoryId = "young";
                }
                else if (koiFish.Size >= 50 && koiFish.Age >= 3 && (koiFish.VarietyId == "kohaku" || koiFish.VarietyId == "sanke" || koiFish.VarietyId == "showa"))
                {
                    koiFishCategory.CategoryId = "sakura";
                }
                else if (koiFish.Size >= 55 && koiFish.Size <= 70 && koiFish.Age >= 3 && koiFish.Age <= 7)
                {
                    koiFishCategory.CategoryId = "adult";
                }
                else if (koiFish.Size >= 70 && koiFish.Size <= 80 && koiFish.Age >= 4)
                {
                    koiFishCategory.CategoryId = "mature";
                }
                else if (koiFish.Size < 40 && koiFish.Age == 2)
                {
                    koiFishCategory.CategoryId = "baby";
                }
                else if (koiFish.Size >= 80 && koiFish.Age >= 4)
                {
                    koiFishCategory.CategoryId = "grand";
                }

                var categories = await _compCateRepo.GetAllCategoryIdsByCompetitionId((Guid)koiFishCategory.CompId);

                // Check if the category exists in the competition categories
                if (!categories.Any(c => c == koiFishCategory.CategoryId))
                {
                    await _registRepo.DeleteAsync(registration);
                    return BadRequest("Your Fish specified category does not exist for this competition.");

                }

                await _compCateRepo.CreateAsync(koiFishCategory);




                await _compCateRepo.CreateAsync(koiFishCategory);


            }

            return Ok();
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetRegistrationById(Guid id)
        {
            var registration = await _registRepo.GetByIDAsync(id);
            return Ok(registration);

        }

        [HttpPost]
        public async Task<IActionResult> AddNewRegistration(RegistrationModel model)
        {
            try
            {
                var newRegistration = _mapper.Map<Tblregistration>(model);
                newRegistration.RegistrationId = Guid.NewGuid();
                await _registRepo.CreateAsync(newRegistration);
                Guid newRegistratioID = newRegistration.RegistrationId;

                var regist = await _registRepo.GetByIDAsync(newRegistratioID);


                if (newRegistration != null)
                {
                    var predict = new Tblprediction();
                    predict.CompId = newRegistration.CompId;
                    predict.KoiId = newRegistration.KoiId;
                    predict.PredictedScore = new Random().Next(1, 101);
                    predict.PredictionId = Guid.NewGuid();

                    await _predictRepo.CreateAsync(predict);




                }
                return regist == null ? NotFound() : Ok(regist);


            }
            catch (Exception ex)
            {
                return BadRequest(); // Return specific error message on exception
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRegist(Guid id, [FromBody] RegistrationModel model)
        {
            var registration = await _registRepo.GetByIDAsync(id);
            if (registration == null)
            {
                return NotFound();
            }

            // Update the koiFish fields from the model
            _mapper.Map(model, registration);

            // Set the KoiId explicitly from the route id
            registration.RegistrationId = id;

            await _registRepo.UpdateAsync(registration);
            return Ok();

        }


        [HttpPut("UpdateStatusAccept/{id}")]
        public async Task<IActionResult> UpdateStatusAccept(Guid id)
        {
            var registration = await _registRepo.GetByIDAsync(id);
            if (registration == null)
            {
                return NotFound();
            }

            registration.Status = 1; // Set status to 1

            await _registRepo.UpdateAsync(registration);
            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegist([FromRoute] Guid id)
        {
            var deleteRegistration = await _registRepo.GetByIDAsync(id);
            if (deleteRegistration == null)
            {
                return NotFound();
            }
            await _registRepo.DeleteAsync(deleteRegistration);
            return NoContent();

        }
    }
}
