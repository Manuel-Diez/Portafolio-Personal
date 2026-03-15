using Dapper;
using Entity.Model.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Reflection;
using Module = Entity.Model.Security.Module;


namespace Entity.Context
{
    public class ApplicationDBContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);

           /*modelBuilder.Entity<Location>().HasData(
           new Location { Id = 1, City = "New York", State = "NY", Country = "USA" },
           new Location { Id = 2, City = "Los Angeles", State = "CA", Country = "USA" },
           new Location { Id = 3, City = "Toronto", State = "ON", Country = "Canada" },
           new Location { Id = 4, City = "London", State = "ENG", Country = "UK" }
            );*/
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<decimal>().HavePrecision(18, 2);

        }

        public override int SaveChanges()
        {
            EnsureAudit();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool AceptAllChangesOnSucces, CancellationToken cancellationToken= default)
        {
            EnsureAudit();
            return base.SaveChangesAsync(AceptAllChangesOnSucces,
                cancellationToken);
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(string text, object parameters = null , int? timeout=null, CommandType? type=null)
        {
            using var command = new DapperEFCoreComand(this,
                text,
                parameters,
                timeout,
                type,
                CancellationToken.None);
            var connection = Database.GetDbConnection();
            return await connection.QueryAsync<T>(command.Definition);
        }

        public async Task<T> QueryFirstOrDefaultAsync<T>(string text, object parameters = null, int? timeout = null, CommandType? type = null)
        {
            using var command = new DapperEFCoreComand(
                this,
                text,
                parameters,
                timeout,
                type,
                CancellationToken.None);
            var connection = Database.GetDbConnection();
            return await connection.QueryFirstOrDefaultAsync<T>(command.Definition);
        }

        private void EnsureAudit()
        {
            ChangeTracker.DetectChanges();
        }

        //Security
        public DbSet<Role> Role => Set<Role>();
        public DbSet<Module> Module => Set<Module>();
        public DbSet<Person> Person => Set<Person>();
        public DbSet<User> User => Set<User>();
        public DbSet<RoleView> RoleView => Set<RoleView>();
        public DbSet<UserRole> UserRole => Set<UserRole>();
        public DbSet<View> View => Set<View>();
        public DbSet<City> City => Set<City>();

        public readonly struct DapperEFCoreComand:IDisposable
        {
            public DapperEFCoreComand(DbContext context, string text, object parameters, int? timeout, CommandType? type, CancellationToken ct)
            {
                var transaction = context.Database.CurrentTransaction?.GetDbTransaction();
                var commandType = type ?? CommandType.Text;
                var commandTimeout = timeout ?? context.Database.GetCommandTimeout() ?? 30;

                Definition = new CommandDefinition(
                    text,
                    parameters,
                    transaction,
                    commandTimeout,
                    commandType,
                    cancellationToken: ct
                    );
            }

            public CommandDefinition Definition { get; }

            public void Dispose() { }
        }
    }
}
