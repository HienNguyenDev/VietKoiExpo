using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.CompCateRepository;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.ResultRepository;
using KSM.Repository.Repositories.ScoreRepository;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly IScoreRepository _scoreRepo;
        private readonly IMapper _mapper;

        private readonly IResultRepository _resultRepo;
        private readonly ICompCateRepository _compCateRepository;
        private readonly IKoifishRepository _koiFishRepository;
        private readonly IUserRepository _userRepository;

        public ScoreController(IScoreRepository repo, IMapper mapper, IResultRepository resultRepo, ICompCateRepository coRepo, IKoifishRepository koiRepo, IUserRepository userRepo)
        {
            _scoreRepo = repo;
            _mapper = mapper;
            _resultRepo = resultRepo;
            _compCateRepository = coRepo;
            _koiFishRepository = koiRepo;
            _userRepository = userRepo;
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

        [HttpGet("TopCompetitionFish")]
        public async Task<IActionResult> TopCompetitionFish()
        {
            var allResults = await _resultRepo.GetAllAsync();

            var topKoiId = allResults
                .GroupBy(r => r.KoiId)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .FirstOrDefault();

            // Assuming you have an IKoiFishRepository
            var topKoiFish = await _koiFishRepository.GetByIDAsync((Guid)topKoiId);

            return Ok(topKoiFish);

        }


        [HttpGet("TopCompetitionUser")]
        public async Task<IActionResult> TopCompetitionUser()
        {
            var results = await _resultRepo.GetAllAsync();
            var koiFish = await _koiFishRepository.GetAllAsync();

            var joinedData = results.Join(koiFish, r => r.KoiId, k => k.KoiId, (r, k) => new { r, k });

            var topKoiId = joinedData
                .GroupBy(r => r.k.UserId)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .FirstOrDefault();

            // Assuming you have an IKoiFishRepository
            var topKoiFish = await _userRepository.GetByIDAsync((Guid)topKoiId);

            return Ok(topKoiFish);

        }

        [HttpGet("TopPrizeFish")]
        public async Task<IActionResult> TopPrizeFish()
        {
            var allResults = await _resultRepo.GetAllAsync();

            // Group results by KoiId and count non-null Prize values
            var groupedResults = allResults
                .GroupBy(r => r.KoiId)
                .Select(g => new
                {
                    KoiId = g.Key,
                    NonNullPrizeCount = g.Count(r => r.Prize != null)
                });

            // Find the KoiId with the maximum non-null Prize count
            var topKoiId = groupedResults
                .OrderByDescending(g => g.NonNullPrizeCount)
                .FirstOrDefault()?.KoiId;

            if (topKoiId == null)
            {
                return NotFound("No fish with prizes found.");
            }

            // Assuming you have an IKoiFishRepository
            var topKoiFish = await _koiFishRepository.GetByIDAsync((Guid)topKoiId);

            return Ok(topKoiFish);
        }

        [HttpGet("TopPrizeUser")]
        public async Task<IActionResult> TopPrizeUser()
        {
            // Fetch all results and koi fish data asynchronously
            var results = await _resultRepo.GetAllAsync();
            var koiFish = await _koiFishRepository.GetAllAsync(); // Assuming you have a repository for TblkoiFish

            // Join the two collections based on KoiId
            var joinedData = results.Join(koiFish, r => r.KoiId, k => k.KoiId, (r, k) => new { r, k });

            // Group by UserId and count non-null Prize values
            var groupedData = joinedData
                .GroupBy(x => x.k.UserId)
                .Select(g => new
                {
                    UserId = g.Key,
                    NonNullPrizeCount = g.Count(x => x.r.Prize != null)
                });

            // Find the UserId with the least null Prize count
            var topUserId = groupedData
                .OrderByDescending(g => g.NonNullPrizeCount)
                .FirstOrDefault()?.UserId;

            if (topUserId == null)
            {
                return NotFound("No user with prize-winning fish found.");
            }

            // Assuming you have a IUserRepository
            var topUser = await _userRepository.GetByIDAsync((Guid)topUserId);

            return Ok(topUser);


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

                // Check scores for the specific Koi in the competition
                var scoresForKoi = await _scoreRepo.GetAllAsync();
                var relatedScores = scoresForKoi
                    .Where(s => s.KoiId == model.KoiId && s.CompId == model.CompId)
                    .ToList();

                // Ensure there are between 1 and 3 scores (including the newly added score)
                if (relatedScores.Count >= 1 && relatedScores.Count <= 3)
                {
                    // Calculate the average score if there are scores present
                    double averageScore = relatedScores.Average(s => s.TotalScore ?? 0);

                    var existingResult = await _resultRepo.GetAllAsync(); // Retrieve all results
                    var koiResult = existingResult.FirstOrDefault(r => r.KoiId == newScore.KoiId && r.CompId == model.CompId);

                    if (koiResult != null)
                    {
                        // Update the existing result with the new average score
                        koiResult.ResultScore = averageScore;
                        await _resultRepo.UpdateAsync(koiResult);
                    }
                    else
                    {
                        // Create a new result if none exists
                        var result = new Tblresult
                        {
                            ResultId = Guid.NewGuid(),
                            KoiId = newScore.KoiId,
                            ResultScore = averageScore,
                            Prize = null, // Function to determine the prize can be implemented here
                            Status = true,
                            CompId = model.CompId
                        };

                        await _resultRepo.CreateAsync(result);
                    }
                }

                // Return the list of related scores
                return score == null ? NotFound() : Ok(new { score, relatedScores });
            }
            catch (Exception ex)
            {
                return BadRequest(); // Return specific error message on exception
            }
        }


        //////////////////////////////////////////////////////////////////////////////////////////

        [HttpPut("assignTopPrizes/{compId}")]
        public async Task<IActionResult> AssignTopPrizes(Guid compId)
        {
            // Retrieve and group Tblresult records by CompId and CategoryId
            var results = await _resultRepo.GetAllAsync();
            var competitionCategorys = await _compCateRepository.GetAllAsync();
            var topResults = results
                .Join(competitionCategorys,
                      result => new { result.CompId, result.KoiId },
                      category => new { category.CompId, category.KoiId },
                      (result, category) => new { Result = result, CategoryId = category.CategoryId })
                .Where(r => r.Result.CompId == compId)
                .GroupBy(r => r.CategoryId) // Group by CategoryId within the specified CompId
                .Select(g => g
                    .OrderByDescending(r => r.Result.ResultScore)
                    .FirstOrDefault())
                .ToList();

            if (topResults == null || !topResults.Any())
            {
                return NotFound("No results found to update.");
            }

            // Update the Prize field for each top-scoring Koi fish
            foreach (var topResult in topResults)
            {
                if (topResult != null)
                {
                    topResult.Result.Prize = $"{topResult.CategoryId} first prize";
                    _resultRepo.Update(topResult.Result);
                }
            }


            return Ok(topResults);
        }


        //////////////////////////////////////////////////////////////////////////////////////////

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
            deleteScore.Status = false;
            await _scoreRepo.UpdateAsync(deleteScore);
            return NoContent();

        }

        [HttpGet("CompetitionKoiStatus")]
        public async Task<IActionResult> GetCompetitionKoiStatus(Guid compId, Guid userId)
        {
            try
            {
                // Lấy tất cả kết quả của cuộc thi
                var results = await _resultRepo.GetAllAsync();
                var koiFish = await _koiFishRepository.GetAllAsync();
                var scores = await _scoreRepo.GetAllAsync();

                // Lọc các con cá tham gia cuộc thi
                var competitionResults = results
                    .Where(r => r.CompId == compId)
                    .Join(koiFish,
                        r => r.KoiId,
                        k => k.KoiId,
                        (r, k) => new
                        {
                            KoiId = k.KoiId,
                            KoiName = k.KoiName,
                            r.CompId
                        });

                // Lấy danh sách cá và trạng thái ScoreStatus
                var koiWithStatus = competitionResults
                    .Select(koi => new
                    {
                        koi.KoiId,
                        koi.KoiName,
                        ScoreStatus = scores.Any(s => s.KoiId == koi.KoiId && s.CompId == koi.CompId && s.UserId == userId) ? 1 : 0
                    })
                    .ToList();

                return Ok(koiWithStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("CheckedInFishWithScoreStatus")]
        public async Task<IActionResult> GetCheckedInFishWithScoreStatus(Guid compId, Guid userId)
        {
            try
            {
                // Lấy danh sách cá đã check-in kèm ScoreStatus
                var checkedInFish = await _koiFishRepository.GetCheckedInKoiWithScoreStatus(compId, userId);

                // Kiểm tra nếu không có dữ liệu
                if (checkedInFish == null || !checkedInFish.Any())
                {
                    return NotFound($"No fish checked in for competition with ID {compId}.");
                }

                return Ok(checkedInFish);
            }
            catch (Exception ex)
            {
                return BadRequest($"An error occurred: {ex.Message}");
            }
        }
    }

}
