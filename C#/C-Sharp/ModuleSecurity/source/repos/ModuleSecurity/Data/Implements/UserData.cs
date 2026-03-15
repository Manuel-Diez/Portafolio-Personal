using Entity.Context;
using Entity.Model.Security;
using Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Data.Interface;
using Entity.Dto;

namespace Data.Implements
{
    public class UserData : IUserData
    {
        private readonly ApplicationDBContext context;
        protected readonly IConfiguration configuration;

        public UserData(ApplicationDBContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }

        public async Task Delete(int id)
        {
            var entity = await GetById(id);
            if (entity == null)
            {
                throw new Exception("Registro no encontrado");
            }
            entity.DeletedAt = DateTime.Parse(DateTime.Now.ToString());
            context.User.Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            var sql = @"SELECT
                    Id,
                    CONCAT(Name, ' - ', Description) AS TextoMostrar
                FROM
                    User
                WHERE Deleted_at IS NULL AND State = 1
                ORDER BY Id ASC";
            return await context.QueryAsync<DataSelectDto>(sql);
        }

        public async Task<User> GetById(int id)
        {
            var sql = @"SELECT * FROM User WHERE Id = @Id ORDER BY Id ASC";
            return await this.context.QueryFirstOrDefaultAsync<User>(sql, new { Id = id });

        }

        public async Task<User> Save(User entity)
        {
            context.User.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task Update(User entity)
        {
            /*context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;*/
            context.User.Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task<User> GetByName(string username)
        {
            return await this.context.User.AsNoTracking().Where(item => item.UserName == username).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            var sql = @"SELECT * FROM User ORDER BY Id ASC";
            return await this.context.QueryAsync<User>(sql);
        }

        public Task<IEnumerable<DataSelectDto>> GetDataSelects()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<User>> SelectAll()
        {
            /*var sql = @"SELECT * FROM User  WHERE DeletedAt IS NULL AND state = 1
            ORDER BY Id ASC";*/
            var sql = @"SELECT * FROM User 
                WHERE (DeletedAt IS NULL OR DeletedAt = '0001-01-01 00:00:00.000000') 
                AND state = 1
                ORDER BY Id ASC;";
            try
            {
                return await this.context.QueryAsync<User>(sql);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al ejecutar la consulta ", ex);
            }
        }
    }
}