using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
using KSM.Repository.Repositories.KoifishRepository;
using KSM.Repository.Repositories.TaskRepository;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepo;
        private readonly IMapper _mapper;
        public TaskController(ITaskRepository repo, IMapper mapper)
        {
            _taskRepo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            try
            {
                var tasks = await _taskRepo.GetAllAsync();
                return Ok(_mapper.Map<List<TaskModel>>(tasks));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(Guid id)
        {
            var koiFish = await _taskRepo.GetByIDAsync(id);
            return Ok(_mapper.Map<KoifishModel>(koiFish));

        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskModel model)
        {
            try
            {
                var newTask = _mapper.Map<Tbltask>(model);
                await _taskRepo.CreateAsync(newTask);
                Guid newTaskID = new Guid();
                var task = await _taskRepo.GetByIDAsync(newTaskID);
                var taskModel = _mapper.Map<TaskModel>(task);
                return taskModel == null ? NotFound() : Ok(taskModel);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(string name, [FromBody] TaskModel model)
        {
            if (name.Equals(model.TaskName))
            {
                return NotFound();
            }
            var updateTask = _mapper.Map<Tbltask>(model);
            await _taskRepo.UpdateAsync(updateTask);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFish([FromRoute] Guid id)
        {
            var deleteTask = await _taskRepo.GetByIDAsync(id);
            if (deleteTask == null)
            {
                return NotFound();
            }
            await _taskRepo.DeleteAsync(deleteTask);
            return NoContent();

        }
    }
}
