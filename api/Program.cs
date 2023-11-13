using api.Data;
using api.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// using var scope = app.Services.CreateScope();
// var services = scope.ServiceProvider;
// try
// {
//     var context = services.GetRequiredService<ApplicationDbContext>();
//     await context.Database.MigrateAsync();
//     await Seed.SeedProducts(context);
// }
// catch (Exception ex)
// {
//     var logger = services.GetService<ILogger<Program>>();
//     logger.LogError(ex, "An error occured during migration");
// }

app.Run();
