using backend.Interfaces;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        public FeedbackController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        // Get all Customer Feedbacks

        [HttpGet]

        public async Task<ActionResult<CustomerFeedbackDTO>> GetAllFeedbacks()
        {
            var feedbacks = await _feedbackService.GetAllFeedbacksAsync();
            var feedbackDtos = feedbacks.Select(feedback => new CustomerFeedbackDTO
            {
                FeedbackId = feedback.FeedbackId,
                UserId = feedback.UserId,
                FirstName = feedback.FirstName,
                LastName = feedback.LastName,
                CustomerFeedbackText = feedback.CustomerFeedbackText,
                Rating = feedback.Rating
            });

            return Ok(feedbackDtos);

        }

        // Get Feedback by Id

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerFeedbackDTO>> GetFeedbackById(string id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (feedback == null) return NotFound();

            var productDto = new CustomerFeedbackDTO
            {
                FeedbackId = feedback.FeedbackId,
                UserId = feedback.UserId,
                FirstName = feedback.FirstName,
                LastName = feedback.LastName,
                CustomerFeedbackText = feedback.CustomerFeedbackText,
                Rating = feedback.Rating
            };

            return Ok(productDto);
        }

        // Add new Feedback

        [HttpPost]

        public async Task<ActionResult<CustomerFeedbackDTO>> AddFeedback([FromForm] CreateFeedbackDTO createFeedbackDTO)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var newFeedback = await _feedbackService.AddFeedbackAsync(createFeedbackDTO);

            if(newFeedback != null)
            {
                var createdFeedbackDto = new CustomerFeedbackDTO
                {
                    UserId = createFeedbackDTO.UserId,
                    FirstName = createFeedbackDTO.FirstName,
                    LastName = createFeedbackDTO.LastName,
                    CustomerFeedbackText = createFeedbackDTO.CustomerFeedbackText,
                    Rating = createFeedbackDTO.Rating
                };

                return CreatedAtAction(nameof(GetFeedbackById, new { id = newFeedback.FeedbackId }, createdFeedbackDto));
            }

            return  BadRequest("Feedback adding failed.");
        }

    }
}