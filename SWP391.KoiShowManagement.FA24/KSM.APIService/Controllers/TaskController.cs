using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
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
        public class TasksModelCreate
        {
            public string TaskName { get; set; }
            public Guid UserId { get; set; }
            public Guid CompId { get; set; }
            public string? TaskDescription { get; set; }
            public string? Date { get; set; }
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
        public async Task<IActionResult> CreateTask(TasksModelCreate task)
        {
            if (!IsValidDateFormat(task.Date, "yyyy-mm-dd"))
            {
                ModelState.AddModelError("NewsDate", "Date must be in the format yyyy-mm-dd.");
                return BadRequest(ModelState);
            }

            if (task.CompId == Guid.Empty || task.UserId == Guid.Empty || string.IsNullOrEmpty(task.TaskName))
            {
                return BadRequest("UserID and CompID are required.");
            }

            var createdTask = new Tbltask()
            {
                TaskId = Guid.NewGuid(),
                TaskName = task.TaskName,
                UserId = task.UserId,
                CompId = task.CompId,
                TaskDescription = task.TaskDescription,
                Date = string.IsNullOrEmpty(task.Date) ? (DateOnly?)null : DateOnly.Parse(task.Date),
                Status = task.Status
            };
            try
            {
                await _taskRepo.CreateAsync(createdTask);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return Ok(createdTask);
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
