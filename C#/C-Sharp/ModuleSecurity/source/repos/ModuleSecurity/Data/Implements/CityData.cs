using Data.Interface;
using Entity.Context;
using Entity.Dto;
using Entity.Model.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Mysqlx.Crud;

namespace Data.Implements
{
    public class CityData :ICityData
    {
        private readonly ApplicationDBContext context;
        protected readonly IConfiguration configuration;

        public CityData(ApplicationDBContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }

        public async Task Delete(int id)
        {
            var entity = await GetById(id);
            if (entity == null)
            {
                throw new Exception("Registro encontrado");
            }
            entity.DeletedAt = DateTime.Parse(DateTime.Now.ToString());
            context.Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            var sql = @"SELECT
                    Id,
                    CONCAT(Citys, ' - ', Country) AS TextoMostrar
                FROM
                    City
                WHERE Deleted_at IS NULL AND State = 1
                ORDER BY Id ASC";
            return await context.QueryAsync<DataSelectDto>(sql);
        }

        public async Task<City> GetById(int id)
        {
            var sql = @"SELECT * FROM City WHERE Id = @Id ORDER BY Id ASC";
            return await this.context.QueryFirstOrDefaultAsync<City>(sql, new { Id = id });
        }

        public async Task<City> Save(City entity)
        {
            context.City.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task Update(City entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task<City> GetByName(String city)
        {
            return await this.context.City.AsNoTracking().Where(item => item.Citys == city).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<City>> GetAll()
        {
            var sql = @"SELECT * FROM City ORDER BY Id ASC";
            return await this.context.QueryAsync<City>(sql);
        }

        public async Task<IEnumerable<City>> SelectAll()
        {
            /*var sql = @"SELECT * FROM City  WHERE DeletedAt IS NULL AND state = 1
                    ORDER BY Id ASC";*/

            var sql = @"SELECT * FROM City 
                    WHERE (DeletedAt IS NULL OR DeletedAt = '0001-01-01 00:00:00.000000') 
                    AND state = 1
                    ORDER BY Id ASC;";
            try
            {
                return await this.context.QueryAsync<City>(sql);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al ejecutar la consulta ", ex);
            }
        }
    }
}
