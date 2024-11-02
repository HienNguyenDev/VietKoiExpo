using KSM.Repository;
using KSM.Repository.Models;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static KSM.APIService.Controllers.UserController;


namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<Tbluser>> GetUsers()
        {
            return await _userRepository.GetAllAsync();
        }

        // GET: api/Users/5
        [HttpGet("{code}")]
        public async Task<ActionResult<Tbluser>> GetUser(Guid code)
        {
            var user = await _userRepository.GetByIDAsync(code);

            if (user == null)
            {
                return BadRequest();
            }

            return user;
        }

        // POST: api/Users
        //Register new User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754    

        public class User {
            public string RoleId { get; set; }

            public string Password { get; set; }

            public string Email { get; set; }

            public string FullName { get; set; }

            public string Phone { get; set; }

            public string Address { get; set; }

            public string? ImageUrl { get; set; }

            public int? Experience { get; set; }

            public bool? Status { get; set; }
        }

        [HttpPost]
        public async Task<Tbluser> PostUser(User user)
        {
            var user1 = new Tbluser()
            {
                UserId = Guid.NewGuid(),
                Password = user.Password,
                RoleId = user.RoleId,
                FullName = user.FullName,
                Email = user.Email,
                Phone = user.Phone,
                Address = user.Address,
                ImageUrl = user.ImageUrl,
                Experience = user.Experience,
                Status = user.Status
            };
            try
            {
                await _userRepository.CreateAsync(user1);
            }
            catch (DbUpdateConcurrencyException)
            {

            }
            return user1;
            //return CreatedAtAction("GetUser", new { id = user1.UserId }, user);
        }

        [HttpPut("OnlyUpdateRole/{id}")]
        public async Task<IActionResult> PutRoleUserOnly(Guid id,[FromBody] string role)
        {
            var user = await _userRepository.GetByIDAsync(id);
            if (user == null)
            {
                return BadRequest();
            }
            try
            {
                user.RoleId = role;
                await _userRepository.UpdateAsync(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{code}")]
        public async Task<IActionResult> PutUser(Guid code, Tbluser user)
        {
            if (!code.Equals(user.UserId))
            {
                return BadRequest();
            }

            try
            {
                await _userRepository.UpdateAsync(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(code))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteUser(Guid code)
        {
            var user = await _userRepository.GetByIDAsync(code);
            if (user == null)
            {
                return NotFound();
            }
            user.Status = false;
            await _userRepository.UpdateAsync(user);

            return NoContent();
        }

        private bool UserExists(Guid code)
        {
            return _userRepository.GetByIDAsync(code) != null;
        }
    }
}

