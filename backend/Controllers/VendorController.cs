using backend.Interfaces;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;


namespace backend.Controllers
{
    
    [Route("api/[controller]")] // Specifies the route template for controller
    [ApiController] // Automatic model validation enabled
    // [Authorize(Roles = "Administrator")]

    public class VendorController(VendorService vendorService, EmailService emailService) : ControllerBase
    {
        private readonly VendorService _vendorService = vendorService;
        private readonly EmailService _emailService = emailService;

    // Get all Vendors

    [HttpGet]
    public async Task<ActionResult<IEnumerable<VendorDTO>>> GetAllVendors()
    {
        var vendors = await _vendorService.GetAllVendorsDTOAsync();
        var vendorDtos = vendors.Select(v => new VendorDTO
        {
            Id = v.Id,
            VendorName = v.VendorName,
            VendorEmail = v.VendorEmail,
            VendorPhone = v.VendorPhone,
            VendorAddress = v.VendorAddress,
            VendorCity = v.VendorCity,
            IsActive = v.IsActive,
            Products = v.Products,
            Feedbacks = v.Feedbacks
        });
        
        return Ok(vendorDtos); // Return 200 ok with list of VendorDTO
    }

    // Get paticular Vendor

    [HttpGet("{id}")]
    [ActionName("GetVendorById")]
    public async Task<ActionResult<VendorDTO>> GetVendorById(string id)
    {
        var vendor = await _vendorService.GetVendorByIdDTOAsync(id);

        if(vendor == null) return NotFound();

        var singleVendorDTO = new VendorDTO
        {
            Id = vendor.Id,
            VendorName = vendor.VendorName,
            VendorEmail = vendor.VendorEmail,
            VendorPhone = vendor.VendorPhone,
            VendorAddress = vendor.VendorAddress,
            VendorCity = vendor.VendorCity,
            IsActive = vendor.IsActive,
            Products = vendor.Products,
            Feedbacks = vendor.Feedbacks
        };

        return Ok(singleVendorDTO);
    }

    // Create new Vendor

    [HttpPost]
    public async Task<ActionResult<VendorDTO>> CreateVendor([FromBody] CreateVendorDTO createVendorDTO)
    {
        if(!ModelState.IsValid) return BadRequest(ModelState);

        var newVendor = await _vendorService.CreateVendorDTOAsync(createVendorDTO);

        if(newVendor != null)
        {
            return CreatedAtAction(nameof(GetVendorById), new { id = newVendor.Id }, newVendor);
        }

        return BadRequest("Vendor creation failed!");
    }

    // Login for vendor

    [HttpPost("login")]

    public async Task<ActionResult> Login([FromBody] VendorLoginDTO vendorLoginDTO)
    {
        if(!ModelState.IsValid) return BadRequest(ModelState);

       try
       {
            var vendorDto = await _vendorService.LoginAsync(vendorLoginDTO);
            return Ok(vendorDto);
       }
       catch(UnauthorizedAccessException ex)
       {
            return Unauthorized(ex.Message);
       }
    }

    // Update existing Vendor

    [HttpPut("{id}")]

    public async Task<ActionResult<VendorDTO>> UpdateVendor(string id, [FromBody] UpdateVendorDTO updateVendorDTO)
    {

        if(id != updateVendorDTO.Id) return BadRequest("Id mismatch!");

        // Check model binding and validation succeed
        if(!ModelState.IsValid) return BadRequest(ModelState);

        var updatedVendor = await _vendorService.UpdateVendorDTOAsync(updateVendorDTO);

        if(updatedVendor == null) return NotFound();

        return Ok(updatedVendor);  
    }

    // Delete existing Vendor

    [HttpDelete("{id}")]

    public async Task<ActionResult> DeleteVendor(string id)
    {
        var result = await _vendorService.GetVendorByIdDTOAsync(id);

        if(result == null) NotFound();

        await _vendorService.DeleteVendorDTOAsync(id);
        //return NoContent(); // 204 successfully deleted, no response body

        return Ok(new {message = "Vendor successfully deleted!"});
    }

    }


}