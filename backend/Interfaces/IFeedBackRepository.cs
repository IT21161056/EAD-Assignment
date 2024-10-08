using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Interfaces
{
    public interface IFeedBackRepository
    {
        Task <IEnumerable<CustomerFeedback>> GetAllFeedbacksAsync();

        Task <CustomerFeedback> GetFeedbackByIdAsync(string id);

        Task<CustomerFeedback> AddFeedbackAsync(CustomerFeedback customerFeedback);
    }

}
      
      
      
      
      
    