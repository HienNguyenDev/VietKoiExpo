using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
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
        public RegistrationController(IRegistrationRepository repo, IMapper mapper, IPredictRepository predictRepo)
        {
            _registRepo = repo;
            _mapper = mapper;
            _predictRepo = predictRepo;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRegistrationById(string id)
        {
            var score = await _registRepo.GetByIDAsync(id);
            return Ok(score);

        }

        [HttpPost]
        public async Task<IActionResult> AddNewRegistration(RegistrationModel model)
        {
            try
            {
                var newRegistration = _mapper.Map<Tblregistration>(model);
                await _registRepo.CreateAsync(newRegistration);
                string newRegistratioID = newRegistration.RegistrationId;
                var regist = await _registRepo.GetByIDAsync(newRegistratioID);
                if (newRegistration != null)
                {
                    var predict = new Tblprediction();
                    predict.CompId = newRegistration.CompId;
                    predict.KoiId = newRegistration.KoiId;
                    predict.PredictedScore = new Random().Next(1, 101);
                    predict.PredictionId = Guid.NewGuid().ToString();

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
        public async Task<IActionResult> UpdateRegist(string id, [FromBody] RegistrationModel model)
        {
            if (id != model.RegistrationId)
            {
                return NotFound();
            }
            var updateRegistration = _mapper.Map<Tblregistration>(model);
            await _registRepo.UpdateAsync(updateRegistration);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegist([FromRoute] string id)
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
