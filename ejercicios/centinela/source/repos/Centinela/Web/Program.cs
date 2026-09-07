using Business.Implements;
using Business.Interface;
using Data.Implements;
using Data.Interface;
using Entity.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsApi",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .WithMethods("GET", "POST", "PUT", "DELETE");
        });
});

var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSection["Key"]!;
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSection["Issuer"],
        ValidAudience = jwtSection["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});
builder.Services.AddAuthorization();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
options.UseMySQL(builder.Configuration.GetConnectionString("MysqlConection")));

builder.Services.AddScoped<IModuleData, ModuleData>();
builder.Services.AddScoped<IModuleBusiness, ModuleBusiness>();

builder.Services.AddScoped<IPersonData, PersonData>();
builder.Services.AddScoped<IPersonBusiness, PersonBusiness>();

builder.Services.AddScoped<IRoleData, RoleData>();
builder.Services.AddScoped<IRoleBusiness, RoleBusiness>();

builder.Services.AddScoped<IRoleViewData, RoleViewData>();
builder.Services.AddScoped<IRoleViewBusiness, RoleViewBusiness>();

builder.Services.AddScoped<IUserData, UserData>();
builder.Services.AddScoped<IUserBusiness, UserBusiness>();

builder.Services.AddScoped<IUserRoleData, UserRoleData>();
builder.Services.AddScoped<IUserRoleBusiness, UserRoleBusiness>();

builder.Services.AddScoped<IViewData, ViewData>();
builder.Services.AddScoped<IViewBusiness, ViewBusiness>();

builder.Services.AddScoped<ICityData, CityData>();
builder.Services.AddScoped<ICityBusiness, CityBusiness>();

builder.Services.AddScoped<IAuthBusiness, AuthBusiness>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
    db.Database.Migrate();
}

app.UseCors("CorsApi");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers().RequireAuthorization();

app.Run();
