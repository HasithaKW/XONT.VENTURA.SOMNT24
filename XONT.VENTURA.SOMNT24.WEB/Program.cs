using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// All service registrations go here:
builder.Services.AddControllersWithViews();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

// Fix CORS - Allow Angular dev server (port 4200)
builder.Services.AddCors(options => {
    options.AddPolicy("VenturaAngularPolicy", policy =>
        policy.WithOrigins("http://localhost:4200")  // ← Change this to 4200, not 7047
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials());
});

// SystemWebAdapters (if used)
builder.Services.AddSystemWebAdapters()
    .AddWrappedAspNetCoreSession()
    .AddJsonSessionSerializer(options =>
    {
        options.RegisterKey<string>("MachineName");
        options.RegisterKey<string>("SessionStartTime");
    });

var app = builder.Build();

// Middleware goes here:
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("VenturaAngularPolicy");  // UseCors after UseRouting
app.UseSession();
app.UseSystemWebAdapters();

app.MapControllers();

app.Run();