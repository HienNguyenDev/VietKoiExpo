﻿using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.CompCateRepository;
using KSM.Repository.Repositories.ResultRepository;
using KSM.Repository.Repositories.ScoreRepository;
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

        public ScoreController(IScoreRepository repo, IMapper mapper, IResultRepository resultRepo, ICompCateRepository coRepo)
        {
            _scoreRepo = repo;
            _mapper = mapper;
            _resultRepo = resultRepo;
            _compCateRepository = coRepo;
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
                ///////////////////////////////////////////////////////////////
                // Kiểm tra xem đã có 3 điểm cho Koi này trong cuộc thi này chưa
                var scoresForKoi = await _scoreRepo.GetAllAsync();
                var relatedScores = scoresForKoi
                    .Where(s => s.KoiId == model.KoiId && s.CompId == model.CompId)
                    .ToList();

                // Check if there are 3 scores, including the newly added score
                if (relatedScores.Count == 3)
                {
                    // Tính điểm trung bình
                    double averageScore = relatedScores.Average(s => s.TotalScore ?? 0);

                    // Tạo hàng mới trong bảng result
                    var result = new Tblresult
                    {
                        ResultId = Guid.NewGuid(),
                        KoiId = newScore.KoiId,
                        ResultScore = averageScore,
                        Prize = null, // Hàm tùy chọn để xác định giải thưởng
                        //ScoreId = null,
                        Status = true,
                        CompId = model.CompId
                    };

                    await _resultRepo.CreateAsync(result);

                }
                /////////////////////////////////////////////////
                return score == null ? NotFound() : Ok(score); // Return created fish on 


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
                    topResult.Result.Prize = $"giải nhất của {topResult.CategoryId}";
                    _resultRepo.Update(topResult.Result);
                }
            }

            // Save the changes to the database
            //await _context.SaveChangesAsync();

            return Ok("Top prizes assigned successfully.");
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
            await _scoreRepo.DeleteAsync(deleteScore);
            return NoContent();

        }


    }

}