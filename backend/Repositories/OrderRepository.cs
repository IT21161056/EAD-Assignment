using backend.Interfaces;
using backend.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IMongoCollection<Order> _orders;
        private readonly IMongoCollection<OrderItem> _orderItems;

        public OrderRepository(IMongoDatabase database)
        {
            _orders = database.GetCollection<Order>("Orders");
            _orderItems = database.GetCollection<OrderItem>("orderItems");
        }

        // Get all orders
        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orders.Find(FilterDefinition<Order>.Empty).ToListAsync();
        }

        // Get order by ID
        public async Task<Order> GetOrderByIdAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return null;

            var filter = Builders<Order>.Filter.Eq(o => o.Id, id);
            return await _orders.Find(filter).FirstOrDefaultAsync();
        }

        // Create a new order
        public async Task<Order> CreateOrderAsync(Order order)
        {
            if (order == null)
                throw new ArgumentNullException(nameof(order));

            await _orders.InsertOneAsync(order);
            return order;
        }

        // Update an existing order
        public async Task<Order> UpdateOrderAsync(Order order)
        {
            if (order == null)
                throw new ArgumentNullException(nameof(order));

            var filter = Builders<Order>.Filter.Eq(o => o.Id, order.Id);
            var result = await _orders.ReplaceOneAsync(filter, order);

            if (result.ModifiedCount == 0)
                throw new KeyNotFoundException($"Order with ID {order.Id} not found.");

            return order;
        }

        // Delete an order by ID
        public async Task DeleteOrderAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                throw new ArgumentException("Order ID cannot be null or empty.", nameof(id));

            var filter = Builders<Order>.Filter.Eq(o => o.Id, id);
            var result = await _orders.DeleteOneAsync(filter);

            if (result.DeletedCount == 0)
                throw new KeyNotFoundException($"Order with ID {id} not found.");
        }

        public async Task<List<string>> AddOrderItemsAsync(List<OrderItem> orderItems)
        {
            if (orderItems == null || orderItems.Count == 0)
            {
                throw new ArgumentException("Order items cannot be null or empty.");
            }

            // Insert multiple order items at once
            await _orderItems.InsertManyAsync(orderItems);

            // Return the inserted ObjectIds as strings
            return orderItems.Select(item => item.Id.ToString()).ToList();
        }


    }
}
