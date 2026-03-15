using Business.Implements;
using Business.Interface;
using Data.Implements;
using Data.Interface;
using Entity.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuracion del  CORS \\
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsApi",
        policy =>
        {
            policy.WithOrigins("*")
                  .AllowAnyHeader()
                  .WithMethods("GET", "POST", "PUT", "DELETE");
        });
});

// Configuración del DbContext antes de construir la aplicación
// Configuración DBcontext con MySQL
builder.Services.AddDbContext<ApplicationDBContext>(options =>
options.UseMySQL(builder.Configuration.GetConnectionString("MysqlConection")));

// Configuración DBcontext con PostgreSQL
// builder.Services.AddDbContext<ApplicationDBContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSqlConnection")));

// Configuración DBcontext con SQL Server
// builder.Services.AddDbContext<ApplicationDBContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("ServerSqlConnection")));

builder.Services.AddScoped<IModuleData, ModuleData>();
builder.Services.AddScoped<IModuleBusiness, ModuleBusiness>();

builder.Services.AddScoped<IPersonData, PersonData>();
builder.Services.AddScoped<IPersonBusiness, PersonBusiness>();

builder.Services.AddScoped<IRoleData, RoleData>();
builder.Services.AddScoped<IRoleBusiness, RoleBusiness>();

builder.Services.AddScoped<IRoleViewData, RoleViewData>();
builder.Services.AddScoped<IRoleViewBusiness, RolViewBusiness>();

builder.Services.AddScoped<IUserData, UserData>();
builder.Services.AddScoped<IUserBusiness, UserBusiness>();

builder.Services.AddScoped<IUserRoleData, UserRoleData>();
builder.Services.AddScoped<IUserRoleBusiness, UserRoleBusiness>();

builder.Services.AddScoped<IViewData, ViewData>();
builder.Services.AddScoped<IViewBusiness, ViewBusiness>();

builder.Services.AddScoped<ICityData, CityData>();
builder.Services.AddScoped<ICityBusiness, CityBusiness>();


// Add services to the container
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Uso del CORS \\
app.UseCors("CorsApi");

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
