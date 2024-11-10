using AutoMapper;
using KSM.Repository;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;
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
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }


        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try 
            {
                var users = await _userRepository.GetAllAsync();
                return Ok(_mapper.Map<List<UserModel>>(users));
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: api/Users/5
        [HttpGet("{code}")]
        public async Task<IActionResult> GetUserByID(Guid code)
        {
            var user = await _userRepository.GetByIDAsync(code);
            return Ok(_mapper.Map<UserModel>(user));
        }

        // POST: api/Users
        //Register new User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754    
        public class UserModelCreate
        {
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
        public async Task<IActionResult> PostUser(UserModelCreate user)
        {
            var createdUser = new Tbluser()
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
                await _userRepository.CreateAsync(createdUser);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }
            return Ok(createdUser);
            //return CreatedAtAction("GetUser", new { id = user1.UserId }, user);
        }

        [HttpPut("OnlyUpdateRole/{id}")]
        public async Task<IActionResult> UpdateRoleUserOnly(Guid id,[FromBody] string role)
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
        public class UserUpdateModel
        {
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

        [HttpPut("{code}")]
        public async Task<IActionResult> UpdateUser(Guid code, [FromBody] UserUpdateModel model)
        {
            //if (!code.Equals(model.UserId))
            //{
            //    return NotFound();
            //}
            //var updateUser = _mapper.Map<Tbluser>(model);
            //await _userRepository.UpdateAsync(updateUser);
            //return Ok();

            var existingUser = await _userRepository.GetByIDAsync(code);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update only the specific fields
            existingUser.RoleId = model.RoleId;
            existingUser.Password = model.Password;
            existingUser.Email = model.Email;
            existingUser.FullName = model.FullName;
            existingUser.Phone = model.Phone;
            existingUser.Address = model.Address;
            existingUser.ImageUrl = model.ImageUrl;
            existingUser.Experience = model.Experience;
            existingUser.Status = model.Status;

            try
            {
                await _userRepository.UpdateAsync(existingUser);
                return Ok(model); // Return only the fields in UserUpdateModel
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

