using backend.DTOs;
using backend.Interfaces;
using backend.Models;

namespace backend.Services
{
    public class FeedbackService
    {
        private readonly IFeedBackRepository _feedbackRepository;

        public FeedbackService(IFeedBackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        public async Task<IEnumerable<CustomerFeedbackDTO>> GetAllFeedbacksAsync()
        {
            var feedbacks =await _feedbackRepository.GetAllFeedbacksAsync();
            return feedbacks.Select(feedback => new CustomerFeedbackDTO
            {
                FeedbackId = feedback.FeedbackId,
                UserId = feedback.UserId,
                FirstName = feedback.FirstName,
                LastName = feedback.LastName,
                CustomerFeedbackText = feedback.CustomerFeedbackText,
                Rating = feedback.Rating
            });
        }

        public async Task<CustomerFeedbackDTO> GetFeedbackByIdAsync(string id)
        {
            var feedback = await _feedbackRepository.GetFeedbackByIdAsync(id);
            if (feedback == null)
                return null;

            return new CustomerFeedbackDTO
            {
                FeedbackId = feedback.FeedbackId,
                UserId = feedback.UserId,
                FirstName = feedback.FirstName,
                LastName = feedback.LastName,
                CustomerFeedbackText = feedback.CustomerFeedbackText,
                Rating = feedback.Rating
            };
        }


        public async Task<CustomerFeedback> AddFeedbackAsync(CreateFeedbackDTO createFeedbackDTO)
        {
            var feedback = new CustomerFeedback
            {
                UserId = createFeedbackDTO.UserId,
                FirstName = createFeedbackDTO.FirstName,
                LastName = createFeedbackDTO.LastName,
                CustomerFeedbackText = createFeedbackDTO.CustomerFeedbackText,
                Rating = createFeedbackDTO.Rating
            };

            return await _feedbackRepository.AddFeedbackAsync(feedback);
        }
    }
}