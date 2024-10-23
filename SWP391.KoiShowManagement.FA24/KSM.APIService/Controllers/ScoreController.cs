using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.ScoreRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly IScoreRepository _scoreRepo;
        private readonly IMapper _mapper;
        public ScoreController(IScoreRepository repo, IMapper mapper)
        {
            _scoreRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllScore()
        {
            try
            {
                var scores = await _scoreRepo.GetAllAsync();
                return Ok(scores);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetScoreById(Guid id)
        {
            var score = await _scoreRepo.GetByIDAsync(id);
            return Ok(score);

        }

        [HttpPost]
        public async Task<IActionResult> AddNewScore(ScoreModel model)
        {
            try
            {
                var newScore = _mapper.Map<Tblscore>(model);
                newScore.ScoreId = Guid.NewGuid();
                newScore.TotalScore = newScore.ScoreColor * 0.3 + newScore.ScoreShape * 0.5 + newScore.ScorePattern * 0.2;
                await _scoreRepo.CreateAsync(newScore);
                Guid newScoreID = newScore.ScoreId;
                var score = await _scoreRepo.GetByIDAsync(newScoreID);
                //var scoreModel = _mapper.Map<ScoreModel>(score);
                return score == null ? NotFound() : Ok(score); // Return created fish on 


            }
            catch (Exception ex)
            {
                return BadRequest(); // Return specific error message on exception
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateScore(Guid id, [FromBody] ScoreModel model)
        {
            var score = await _scoreRepo.GetByIDAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            // Update the koiFish fields from the model
            _mapper.Map(model, score);

            // Set the KoiId explicitly from the route id
            score.ScoreId = id;

            await _scoreRepo.UpdateAsync(score);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore([FromRoute] Guid id)
        {
            var deleteScore = await _scoreRepo.GetByIDAsync(id);
            if (deleteScore == null)
            {
                return NotFound();
            }
            await _scoreRepo.DeleteAsync(deleteScore);
            return NoContent();

        }


    }

}
