using System.Text.Json;
using api.Entities;
using api.Helpers;
using api.Repository.Interfaces;
using StackExchange.Redis;

namespace api.Repository;

public class BasketRepository : IBasketRepository
{
    private readonly IDatabase _database;
    private readonly IUnitOfWork _unitOfWork;

    public BasketRepository(IUnitOfWork unitOfWork, IConnectionMultiplexer redis)
    {
        _unitOfWork = unitOfWork;
        _database = redis.GetDatabase();
    }

    public async Task<CustomerBasket> GetBasketAsync(string basketId)
    {
        var data = await _database.StringGetAsync(basketId);

        return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
    }

    public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
    {
        var newList = new List<BasketItem>();
        foreach (var item in basket.Items)
        {
            var query = await _unitOfWork.ProductRepository.GetAsync(
                filter: i => i.Id == item.Id,
                includeProperties: SD.ProductIncludeTypeAndBrand);

            var product = query.FirstOrDefault();

            if (product == null) continue;

            var basketItem = new BasketItem()
            {
                Id = product.Id,
                ProductName = product.Name,
                Price = product.Price,
                Quantity = item.Quantity,
                PictureUrl = product.PictureUrl,
                Type = product.ProductType.Name,
                Brand = product.ProductBrand.Name
            };

            newList.Add(basketItem);
        }

        basket.Items = newList;

        var created = await _database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket),
                TimeSpan.FromDays(30));

        if (!created) return null;

        return await GetBasketAsync(basket.Id);
    }

    public async Task<bool> DeleteBasketAsync(string basketId)
    {
        return await _database.KeyDeleteAsync(basketId);
    }

    public Task<bool> DeleteBasketItemAsync(string basketId, int itemId)
    {
        throw new NotImplementedException();
    }
}