using backend.Interfaces;
using backend.Models;
using MongoDB.Driver;

namespace backend.Repositories{

    public class VendorRepository : IVendorRepository
    {
        private readonly IMongoCollection<Vendor> _vendor;

        public VendorRepository(IMongoDatabase mongoDatabase)
        {
            _vendor = mongoDatabase.GetCollection<Vendor>("Vendors");
        }

        public Task<IEnumerable<Vendor>> GetAllVendorsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Vendor> GetVendorByIdAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<Vendor> CreateVendor(Vendor vendor)
        {
            throw new NotImplementedException();
        }

        public Task<Vendor> UpdateVendorAsync(Vendor updatedVendor)
        {
            throw new NotImplementedException();
        }

        public Task DeleteVendorAsync(string id){

            throw new NotImplementedException();
        }

    }
}