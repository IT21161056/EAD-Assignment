using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();

                if (users == null)
                {
                    return NotFound("No users found.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/User/vendors
        [HttpGet("vendors")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllVendors()
        {
            try
            {
                var vendors = await _userService.GetAllVendorsAsync();

                if (vendors == null)
                {
                    return NotFound("No vendors found.");
                }

                return Ok(vendors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPatch("approve/{id}")]
        public async Task<IActionResult> ApproveVendor(string id)
        {
            try
            {
                var result = await _userService.ApproveUser(id);
                if (result.Succeeded)
                {
                    return Ok(new { message = "User updated successfully!" });
                }

                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // GET: api/User/unApproved
        [HttpGet("unApproved")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUnApprovedUsers()
        {
            try
            {
                var users = await _userService.GetAllUnApprovedUsersAsync();

                if (users == null)
                {
                    return NotFound("No users found.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/User/unApproved
        [HttpGet("vendors/unApproved")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUnApprovedVendors()
        {
            try
            {
                var users = await _userService.GetAllUnApprovedVendorsAsync();

                if (users == null)
                {
                    return NotFound("No vendors found.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
