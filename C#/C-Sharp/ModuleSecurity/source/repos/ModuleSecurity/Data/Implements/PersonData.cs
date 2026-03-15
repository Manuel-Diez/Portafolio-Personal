using Entity.Context;
using Entity.Model.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Entity.Dto;
using Data.Interface;

namespace Data.Implements
{
    public class PersonData : IPersonData
    {
        private readonly ApplicationDBContext context;
        protected readonly IConfiguration configuration;

        public PersonData(ApplicationDBContext context, IConfiguration configuration)
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
            context.Person.Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            var sql = @"SELECT
                    Id,
                    CONCAT(Name, ' - ', Description) AS TextoMostrar
                FROM
                    Person
                WHERE Deleted_at IS NULL AND State = 1
                ORDER BY Id ASC";
            return await context.QueryAsync<DataSelectDto>(sql);
        }

        public async Task<Person> GetById(int id)
        {
            var sql = @"SELECT * FROM Person WHERE Id = @Id ORDER BY Id ASC";
            return await this.context.QueryFirstOrDefaultAsync<Person>(sql, new { Id = id });

        }

        public async Task<Person> Save(Person entity)
        {
            context.Person.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task Update(Person entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task<Person> GetByName(string document)
        {
            return await this.context.Person.AsNoTracking().Where(item => item.Document == document).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Person>> GetAll()
        {
            var sql = @"SELECT * FROM Person ORDER BY Id ASC";
            return await this.context.QueryAsync<Person>(sql);
        }

        public async Task<IEnumerable<Person>> SelectAll()
        {
            /*var sql = @"SELECT * FROM Person  WHERE DeletedAt IS NULL AND state = 1
            ORDER BY Id ASC";*/
            var sql = @"SELECT * FROM Person 
                    WHERE (DeletedAt IS NULL OR DeletedAt = '0001-01-01 00:00:00.000000') 
                    AND state = 1
                    ORDER BY Id ASC;";
            try
            {
                return await this.context.QueryAsync<Person>(sql);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al ejecutar la consulta ", ex);
            }
        }
    }
}