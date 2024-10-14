using KSM.Repository.Models;
using KSM.Repository.Repositories.ScoreRepository;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static KSM.APIService.Controllers.ScoreController;
using static KSM.APIService.Controllers.UserController;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : Controller
    {
        private readonly IScoreRepository _scoreRepository;

        public ScoreController(IScoreRepository scoreRepository)
        {
            _scoreRepository = scoreRepository;
        }

        // GET: api/Score
        [HttpGet]
        public async Task<IEnumerable<Tblscore>> GetScore()
        {
            return await _scoreRepository.GetAllAsync();
        }

        // GET: api/Score/5
        [HttpGet("{id}")]
        public async Task<Tblscore> GetScore(string id)
        {
            var score = await _scoreRepository.GetByIDAsync(id);
            return score;
        }

        public class Score
        {
            public string ScoreId { get; set; }

            public string KoiId { get; set; }

            public string CompId { get; set; }

            public string UserId { get; set; }

            public double? ScoreShape { get; set; }

            public double? ScoreColor { get; set; }

            public double? ScorePattern { get; set; }
        }

        [HttpPost]
        public async Task<Tblscore> PostUser(Score score)
        {
            var createScore = new Tblscore()
            {
                ScoreId = score.ScoreId,
                KoiId = score.KoiId,
                CompId = score.CompId,
                UserId = score.UserId,
                ScoreShape = score.ScoreShape,
                ScoreColor = score.ScoreColor,
                ScorePattern = score.ScorePattern,
                TotalScore = 0.5*score.ScoreShape + 0.3*score.ScoreColor + 0.2*score.ScorePattern,
            };
            try
            {
                await _scoreRepository.CreateAsync(createScore);
            }
            catch (DbUpdateConcurrencyException)
            {

            }
            return createScore;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutScore(string id, Tblscore score)
        {
            if (!id.Equals(score.ScoreId))
            {
                return BadRequest();
            }

            try
            {
                await _scoreRepository.UpdateAsync(score);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScoreExists(id))
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

        private bool ScoreExists(string id)
        {
            return _scoreRepository.GetByIDAsync(id) != null;
        }

        // DELETE: api/Score/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScore(string id)
        {
            var score = await _scoreRepository.GetByIDAsync(id);
            if (score == null)
            {
                return NotFound();
            }

            await _scoreRepository.DeleteAsync(score);

            return NoContent();
        }
    }
}
