using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.CompetitionRepository;
using KSM.Repository.Repositories.VarietyRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static KSM.APIService.Controllers.NewsController;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionController : ControllerBase
    {
        private readonly ICompetitionRepository _competitionRepo;
        private readonly IMapper _mapper;
        public CompetitionController(ICompetitionRepository repo, IMapper mapper)
        {
            _competitionRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCompetition()
        {
            try
            {
                var competition = await _competitionRepo.GetAllAsync();
                return Ok(_mapper.Map<List<CompetitionModel>>(competition));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompetitionById(string id)
        {
            var competition = await _competitionRepo.GetByIDAsync(id);
            return Ok(_mapper.Map<CompetitionModel>(competition));
        }


        /// ////////////////////////////////////////////////////////////////////////////////////
        public class CompetitionModelCreate
        {
            public string CompId { get; set; }

            public string CategoryId { get; set; }

            public string CompName { get; set; }

            public string CompDescription { get; set; }

            public string Location { get; set; }

            public string? StartDate { get; set; }

            public string? EndDate { get; set; }

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
        public async Task<IActionResult> CreateCompetition(CompetitionModelCreate competition)
        {
            if (!IsValidDateFormat(competition.StartDate, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("StartDate", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }

            if (!IsValidDateFormat(competition.EndDate, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("EndDate", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(competition.CompId) || string.IsNullOrEmpty(competition.CategoryId))
            {
                return BadRequest("CompId and CategoryId are required.");
            }

            var createdCompetition = new Tblcompetition()
            {
                CompId = competition.CompId,
                CategoryId = competition.CategoryId,
                CompName = competition.CompName,
                CompDescription = competition.CompDescription,
                Location = competition.Location,
                StartDate = string.IsNullOrEmpty(competition.StartDate) ? (DateOnly?)null : DateOnly.Parse(competition.StartDate),
                EndDate = string.IsNullOrEmpty(competition.EndDate) ? (DateOnly?)null : DateOnly.Parse(competition.EndDate),
                Status = competition.Status
            };
            try
            {

                await _competitionRepo.CreateAsync(createdCompetition);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(createdCompetition);
        }
        ////////////////////////////////////////////////////////////////////////////////////////
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompetition(string id, [FromBody] CompetitionModelCreate competition)
        {
            if (id != competition.CompId)
            {
                return BadRequest("The news ID in the URL does not match the news ID in the body.");
            }

            if (string.IsNullOrEmpty(competition.CompId) || string.IsNullOrEmpty(competition.CategoryId))
            {
                return BadRequest("CompId and CategoryId are required.");
            }

            // Validate the date format
            if (!IsValidDateFormat(competition.StartDate, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("StartDate", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }

            if (!IsValidDateFormat(competition.EndDate, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("EndDate", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }

            try
            {
                // Fetch the existing news from the database
                var existingCompetition = await _competitionRepo.GetByIDAsync(id);
                if (existingCompetition == null)
                {
                    return NotFound("News not found.");
                }

                // Update the existing news with new values
                existingCompetition.CompId = competition.CompId;
                existingCompetition.CategoryId = competition.CategoryId;
                existingCompetition.CompName = competition.CompName;
                existingCompetition.CompDescription = competition.CompDescription;
                existingCompetition.Location = competition.Location;
                existingCompetition.StartDate = string.IsNullOrEmpty(competition.StartDate) ? (DateOnly?)null : DateOnly.Parse(competition.StartDate);
                existingCompetition.EndDate = string.IsNullOrEmpty(competition.EndDate) ? (DateOnly?)null : DateOnly.Parse(competition.EndDate);
                existingCompetition.Status = competition.Status;

                // Save the updated news
                await _competitionRepo.UpdateAsync(existingCompetition);
                return Ok(existingCompetition);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Log exception details for debugging (optional)
                return BadRequest(ex.Message);
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetition([FromRoute] string id)
        {
            var deleteCompetition = await _competitionRepo.GetByIDAsync(id);
            if (deleteCompetition == null)
            {
                return NotFound();
            }
            await _competitionRepo.DeleteAsync(deleteCompetition);
            return NoContent();

        }
    }
}
