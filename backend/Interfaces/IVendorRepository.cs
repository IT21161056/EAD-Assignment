using backend.Models;

namespace backend.Interfaces
{
    public interface IVendorRepository
    {
        Task<IEnumerable<Vendor>> GetAllVendorsAsync();

        Task<Vendor> GetVendorByIdAsync(string id);

        Task<Vendor> CreateVendor(Vendor vendor);

        Task<Vendor> UpdateVendorAsync(Vendor updatedVendor);

        Task DeleteVendorAsync(string id);
    }
}