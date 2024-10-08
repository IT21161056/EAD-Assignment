using backend.Interfaces;
using backend.Models;
using MongoDB.Driver;

namespace backend.Repositories
{
    public class FeedbackRepository : IFeedBackRepository
    {
        private readonly IMongoCollection<CustomerFeedback> _customerFeedbacks;

        public FeedbackRepository(IMongoDatabase mongoDatabase)
        {
            _customerFeedbacks = mongoDatabase.GetCollection<CustomerFeedback>("Feedbacks");
        }

        public async Task<IEnumerable<CustomerFeedback>> GetAllFeedbacksAsync()
        {
            try
            {
                return await _customerFeedbacks.Find(FilterDefinition<CustomerFeedback>.Empty).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error retrieving customer feedbacks", ex);
            }
        }

        public async Task<CustomerFeedback> GetFeedbackByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new ArgumentException("Invalid feedback ID.");

            try
            {
                var filter = Builders<CustomerFeedback>.Filter.Eq(f => f.FeedbackId, id);
                return await _customerFeedbacks.Find(filter).FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"Error retrieving feedback with ID {id}", ex);
            }
        }

        public async Task<CustomerFeedback> AddFeedbackAsync(CustomerFeedback customerFeedback)
        {
            if (customerFeedback == null)
                throw new ArgumentNullException(nameof(customerFeedback));

            try
            {
                await _customerFeedbacks.InsertOneAsync(customerFeedback);
                return customerFeedback; 
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error adding a feedback.", ex);
            }
        }
    }
}