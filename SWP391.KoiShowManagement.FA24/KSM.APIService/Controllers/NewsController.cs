using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.NewsRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsRepository _newsRepo;
        private readonly IMapper _mapper;
        public NewsController(INewsRepository repo, IMapper mapper)
        {
            _newsRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNews()
        {
            try
            {
                var news = await _newsRepo.GetAllAsync();
                return Ok(_mapper.Map<List<NewsModel>>(news));
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsById(Guid id)
        {
            var news = await _newsRepo.GetByIDAsync(id);
            return Ok(_mapper.Map<NewsModel>(news));
        }

        //[HttpPost]
        //public async Task<IActionResult> CreateNews(NewsModel model)
        //{
        //    try
        //    {
        //        var newNews = _mapper.Map<Tblnews>(model);

        //        await _newsRepo.CreateAsync(newNews);
        //        string newNewsID = newNews.NewsId;
        //        var news = await _newsRepo.GetByIDAsync(newNewsID);
        //        var newsModel = _mapper.Map<NewsModel>(news);
        //        return newsModel == null ? NotFound() : Ok(newsModel);
        //        //return CreatedAtAction(nameof(GetNewsById), new { id = newNews.NewsId }, _mapper.Map<Tblnews>(newNews));

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(); 
        //    }
        //}
        public class NewsModelCreate
        {
            public string NewsId { get; set; }

            public string NewsTypeId { get; set; }

            public string UserId { get; set; }

            public string? Date { get; set; }

            public string Description { get; set; }
        }
        ////////////////////////////////
        private bool IsValidDateFormat(string date, string format)
        {
            return DateTime.TryParseExact(date, format,
                                          System.Globalization.CultureInfo.InvariantCulture,
                                          System.Globalization.DateTimeStyles.None,
                                          out _);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNews(NewsModelCreate news)
        {
            if (!IsValidDateFormat(news.Date, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("Date", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(news.NewsId) || string.IsNullOrEmpty(news.NewsTypeId) || string.IsNullOrEmpty(news.UserId))
            {
                return BadRequest("NewsId, NewsTypeId, and UserId are required.");
            }

            var createdNews = new Tblnews()
            {
                NewsId = new Guid(),
                NewsTypeId = news.NewsTypeId,
                UserId = new Guid(),

                //Date = DateOnly.Parse(news.Date),
                NewsDate = string.IsNullOrEmpty(news.Date) ? (DateOnly?)null : DateOnly.Parse(news.Date),

                NewsDescription = news.Description
            };
            try
            {

                await _newsRepo.CreateAsync(createdNews);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(createdNews);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateNews(string id, [FromBody] NewsModel model)
        //{
        //    if (id != model.NewsId)
        //    {
        //        return NotFound();
        //    }
        //    var updateNews = _mapper.Map<Tblnews>(model);
        //    await _newsRepo.UpdateAsync(updateNews);
        //    return Ok();
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNews(Guid id, [FromBody] NewsModelCreate news)
        {
            // Ensure the ID in the URL matches the news ID from the request body
            if (!id.Equals(news.NewsId))
            {
                return BadRequest("The news ID in the URL does not match the news ID in the body.");
            }

            // Validate required fields (NewsId, NewsTypeId, UserId, etc.)
            if (string.IsNullOrEmpty(news.NewsId) || string.IsNullOrEmpty(news.NewsTypeId) || string.IsNullOrEmpty(news.UserId))
            {
                return BadRequest("NewsId, NewsTypeId, and UserId are required.");
            }

            // Validate the date format
            if (!IsValidDateFormat(news.Date, "yyyy-MM-dd"))
            {
                ModelState.AddModelError("Date", "Date must be in the format yyyy-MM-dd.");
                return BadRequest(ModelState);
            }

            try
            {
                // Fetch the existing news from the database
                var existingNews = await _newsRepo.GetByIDAsync(id);
                if (existingNews == null)
                {
                    return NotFound("News not found.");
                }

                // Update the existing news with new values
                existingNews.NewsId = new Guid();
                existingNews.NewsTypeId = news.NewsTypeId;
                existingNews.UserId = new Guid();
                existingNews.NewsDate = string.IsNullOrEmpty(news.Date) ? (DateOnly?)null : DateOnly.Parse(news.Date);
                existingNews.NewsDescription = news.Description;

                // Save the updated news
                await _newsRepo.UpdateAsync(existingNews);
                return Ok(existingNews);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Log exception details for debugging (optional)
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNews([FromRoute] Guid id)
        {
            var deleteNews = await _newsRepo.GetByIDAsync(id);
            if (deleteNews == null)
            {
                return NotFound();
            }
            await _newsRepo.DeleteAsync(deleteNews);
            return NoContent();

        }

    }
}
