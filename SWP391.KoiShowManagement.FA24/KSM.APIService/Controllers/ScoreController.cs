﻿using AutoMapper;
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
                return Ok(_mapper.Map<List<ScoreModel>>(scores));
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
            return Ok(_mapper.Map<ScoreModel>(score));

        }

        [HttpPost]
        public async Task<IActionResult> AddNewScore(ScoreModel model)
        {
            try
            {
                var newScore = _mapper.Map<Tblscore>(model);
                await _scoreRepo.CreateAsync(newScore);
                Guid newScoreID = new Guid();
                var score = await _scoreRepo.GetByIDAsync(newScoreID);
                var scoreModel = _mapper.Map<ScoreModel>(score);
                return scoreModel == null ? NotFound() : Ok(scoreModel); // Return created fish on 


            }
            catch (Exception ex)
            {
                return BadRequest(); // Return specific error message on exception
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateScore(string id, [FromBody] ScoreModel model)
        {
            if (id != model.ScoreId)
            {
                return NotFound();
            }
            var updateScore = _mapper.Map<Tblscore>(model);
            await _scoreRepo.UpdateAsync(updateScore);
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