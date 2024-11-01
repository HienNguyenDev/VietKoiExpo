using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.CompCateRepository;
using KSM.Repository.Repositories.CompetitionRepository;
using KSM.Repository.Repositories.VarietyRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static KSM.APIService.Controllers.CompetitionController;
using static KSM.APIService.Controllers.NewsController;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompetitionController : ControllerBase
    {
        private readonly ICompetitionRepository _competitionRepo;
        private readonly IMapper _mapper;
        private readonly ICompCateRepository _compCateRepository;
        public CompetitionController(ICompetitionRepository repo, IMapper mapper, ICompCateRepository coRepo)
        {
            _competitionRepo = repo;
            _mapper = mapper;
            _compCateRepository = coRepo;
        }

        /// ////////////////////////////////////////////////////////////////////////////////////

        [HttpGet]
        public async Task<IActionResult> GetAllCompetition()
        {
            try
            {
                //var competition = await _competitionRepo.GetAllAsync();
                var competition = await _competitionRepo.GetAllWithCategoriesAsync();
                return Ok(competition);
            }
            catch
            {
                return BadRequest();
            }
        }

        /// ////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("CompetitonCategories/{competitionID}")]
        public async Task<IActionResult> GetCategoriesByCompId(Guid competitionID)
        {
            var categories = await _compCateRepository.GetAllCategoriesByCompetitionID(competitionID);


            return Ok(categories);
        }
        /// ////////////////////////////////////////////////////////////////////////////////////

        [HttpGet("CompetitonCategoriesFish/{competitionID}")]
        public async Task<IActionResult> GetFishByCategoryAndCompId(Guid competitionID, string comID)
        {
            var fishes = await _compCateRepository.GetAllFishByCategoryAndCompId(competitionID, comID);
            var filteredFishes = fishes.Where(fish => fish != null);

            return Ok(filteredFishes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompetitionById(Guid id)
        {
            var competition = await _competitionRepo.GetByIDAsync(id);
            return Ok(competition);
        }


        /// ////////////////////////////////////////////////////////////////////////////////////
        public class CompetitionModelCreate
        {
            //public Guid CompId { get; set; }

            public List<string>? CategoryId { get; set; }

            public string CompName { get; set; }

            public string CompDescription { get; set; }

            public string Location { get; set; }

            public string ImageUrl { get; set; }

            public string? StartDate { get; set; }

            public string? EndDate { get; set; }

            public int? Status { get; set; }
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


            var createdCompetition = new Tblcompetition()
            {
                CompId = Guid.NewGuid(),
                CompName = competition.CompName,
                CompDescription = competition.CompDescription,
                Location = competition.Location,
                ImageUrl = competition.ImageUrl,
                StartDate = string.IsNullOrEmpty(competition.StartDate) ? (DateOnly?)null : DateOnly.Parse(competition.StartDate),
                EndDate = string.IsNullOrEmpty(competition.EndDate) ? (DateOnly?)null : DateOnly.Parse(competition.EndDate),
                Status = competition.Status
            };
            try
            {

                await _competitionRepo.CreateAsync(createdCompetition);

                if (competition.CategoryId != null)
                {
                    foreach (var category in competition.CategoryId)
                    {
                        var createdCompetitionCatergory = new TblcompetitionCategory()
                        {
                            CompetitionCategoryId = Guid.NewGuid(),
                            CompId = createdCompetition.CompId,
                            CategoryId = category
                        };
                        await _compCateRepository.CreateAsync(createdCompetitionCatergory);
                    }
                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(createdCompetition);
        }
        ////////////////////////////////////////////////////////////////////////////////////////
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompetition(Guid id, [FromBody] CompetitionModelCreate competition)
        {

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
                existingCompetition.CompId = id;
                existingCompetition.CompName = competition.CompName;
                existingCompetition.CompDescription = competition.CompDescription;
                existingCompetition.Location = competition.Location;
                existingCompetition.ImageUrl = competition.ImageUrl;
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
        public async Task<IActionResult> DeleteCompetition([FromRoute] Guid id)
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
