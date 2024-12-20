﻿using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.VarietyRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VarietyController : ControllerBase
    {
        private readonly IVarietyRepository _varietyRepo;
        private readonly IMapper _mapper;
        public VarietyController(IVarietyRepository repo, IMapper mapper)
        {
            _varietyRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVariety()
        {
            try
            {
                var varieties = await _varietyRepo.GetAllAsync();
                return Ok(_mapper.Map<List<VarietyModel>>(varieties));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVarietyById(string id)
        {
            var varieties = await _varietyRepo.GetByIDAsync(id);
            return Ok(_mapper.Map<VarietyModel>(varieties));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVariety(string id, [FromBody] VarietyModel model)
        {
            if (id != model.VarietyId)
            {
                return NotFound();
            }
            var updateVariety = _mapper.Map<Tblvariety>(model);
            await _varietyRepo.UpdateAsync(updateVariety);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVariety([FromRoute] string id)
        {
            var deleteVariety = await _varietyRepo.GetByIDAsync(id);
            if (deleteVariety == null)
            {
                return NotFound();
            }
            await _varietyRepo.DeleteAsync(deleteVariety);
            return NoContent();

        }
    }
}
