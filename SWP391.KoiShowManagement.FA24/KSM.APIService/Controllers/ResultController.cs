using AutoMapper;
using KSM.Repository.Repositories.CheckInRepository;
using KSM.Repository.Repositories.CompCateRepository;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.PredictRepository;
using KSM.Repository.Repositories.RegistrationRepository;
using KSM.Repository.Repositories.ResultRepository;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : Controller
    {
        IResultRepository _resultRepo;
        public ResultController(IResultRepository repo)
        {
            _resultRepo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllResult()
        {
            try
            {
                var results = await _resultRepo.GetAllAsync();
                return Ok(results);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetResultById(Guid id)
        {
            var result = await _resultRepo.GetByIDAsync(id);
            return Ok(result);

        }

        [HttpGet("byKoiId/{koiId}")]
        public async Task<IActionResult> GetResultsByKoiId(Guid koiId)
        {
            try
            {
                var results = await _resultRepo.GetByKoiIdAsync(koiId);
                return Ok(results);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("byCompId/{compId}")]
        public async Task<IActionResult> GetResultsByCompId(Guid compId)
        {
            try
            {
                var results = await _resultRepo.GetByCompIdAsync(compId);
                return Ok(results);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("byKoiIdAndCompId")]
        public async Task<IActionResult> GetResultsByKoiIdAndCompId(Guid koiId, Guid compId)
        {
            try
            {
                var results = await _resultRepo.GetByKoiIdAndCompIdAsync(koiId, compId);
                return Ok(results);
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
