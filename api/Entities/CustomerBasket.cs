﻿namespace api.Entities;

public class CustomerBasket
{

    public CustomerBasket()
    {
    }

    public CustomerBasket(string id)
    {
        Id = id;
    }

    public string Id { get; set; }

    public ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();

}