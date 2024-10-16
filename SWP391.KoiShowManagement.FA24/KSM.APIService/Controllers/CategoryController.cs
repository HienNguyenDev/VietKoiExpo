using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.CategoryRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository repo, IMapper mapper)
        {
            _categoryRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _categoryRepo.GetAllAsync();
                return Ok(_mapper.Map<List<CategoryModel>>(categories));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            var category = await _categoryRepo.GetByIDAsync(id);
            return Ok(_mapper.Map<CategoryModel>(category));

        }

        [HttpPost]
        public async Task<IActionResult> AddNewCategory(CategoryModel model)
        {
            try
            {
                var newCategory = _mapper.Map<Tblcategory>(model);
                await _categoryRepo.CreateAsync(newCategory);
                string newCategoryID = newCategory.CategoryId;
                var category = await _categoryRepo.GetByIDAsync(newCategoryID);
                var categoryModel = _mapper.Map<CategoryModel>(category);
                return categoryModel == null ? NotFound() : Ok(categoryModel); // Return created fish on 


            }
            catch (Exception ex)
            {
                return BadRequest(); // Return specific error message on exception
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, [FromBody] CategoryModel model)
        {
            if (id != model.CategoryId)
            {
                return NotFound();
            }
            var updateCategory = _mapper.Map<Tblcategory>(model);
            await _categoryRepo.UpdateAsync(updateCategory);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] string id)
        {
            var deleteCategory = await _categoryRepo.GetByIDAsync(id);
            if (deleteCategory == null)
            {
                return NotFound();
            }
            await _categoryRepo.DeleteAsync(deleteCategory);
            return NoContent();

        }

    }
}
