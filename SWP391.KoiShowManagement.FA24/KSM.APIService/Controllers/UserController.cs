using KSM.Repository;
using KSM.Repository.Models;
using KSM.Repository.Repositories.UserRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
            public string Fullname { get; set; }
            public string Password { get; set; }
        }

        [HttpPost]
        public async Task<Tbluser> PostUser(User user)
        {
            var user1 = new Tbluser()
            {
                UserId = Guid.NewGuid(),
                FullName = user.Fullname,
                Password = user.Password
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

            await _userRepository.DeleteAsync(user);

            return NoContent();
        }

        private bool UserExists(Guid code)
        {
            return _userRepository.GetByIDAsync(code) != null;
        }
    }
}

