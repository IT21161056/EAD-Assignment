using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson; // For ObjectId

namespace backend.Interfaces
{
    public interface IUserService
    {
        // User-related methods
        Task<IEnumerable<User>> GetAllUsersAsync();


        Task<IEnumerable<User>> GetAllVendorsAsync();

        Task<IdentityResult> ApproveUser(string id);

        Task<IEnumerable<User>> GetAllUnApprovedUsersAsync();
        Task<IEnumerable<User>> GetAllUnApprovedVendorsAsync();
    }
}
