using System.Net;
using System.Text.Json;
using api.Exceptions;

namespace api.Middlewares;

public class ServerErrorExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ServerErrorExceptionMiddleware> _logger;
    private readonly IWebHostEnvironment _evn;

    public ServerErrorExceptionMiddleware(RequestDelegate next, ILogger<ServerErrorExceptionMiddleware> logger, IWebHostEnvironment evn)
    {
        _next = next;
        _logger = logger;
        _evn = evn;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

            var response = _evn.IsDevelopment()
                ? new ErrorResponse(context.Response.StatusCode, ex.Message + ex.StackTrace)
                : new ErrorResponse(context.Response.StatusCode);

            var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}