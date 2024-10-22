using KSM.Repository.Models;
using KSM.Repository.Repositories.RoleRepository;
using Microsoft.AspNetCore.Mvc;

namespace KSM.APIService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }


        // GET: api/Roles
        [HttpGet]
        public async Task<IEnumerable<Tblrole>> GetRoles()
        {
            return await _roleRepository.GetAllAsync();
        }

        // GET: api/Roles/member
        [HttpGet("{code}")]
        public async Task<Tblrole> GetRole(string code)
        {
            var role = await _roleRepository.GetByIDAsync(code);
            return role;
        }
    }
}
