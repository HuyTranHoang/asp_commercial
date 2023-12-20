using StackExchange.Redis;

namespace api.Helpers;

public class RedisConnectionFactory
{
    private static ConnectionMultiplexer connection;

    private readonly ConfigurationOptions config;

    public RedisConnectionFactory(string connectionString)
    {
        config = ConfigurationOptions.Parse(connectionString);
    }

    public ConnectionMultiplexer Connection()
    {
        if (connection == null || !connection.IsConnected)
        {
            connection = ConnectionMultiplexer.Connect(config);
        }

        return connection;
    }
}