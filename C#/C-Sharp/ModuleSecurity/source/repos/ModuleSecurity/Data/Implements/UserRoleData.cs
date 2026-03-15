using Data.Interface;
using Entity.Context;
using Entity.Dto;
using Entity.Model.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements
{
    public class UserRoleData : IUserRoleData
    {
        private readonly ApplicationDBContext context;
        protected readonly IConfiguration configuration;

        public UserRoleData(ApplicationDBContext context, IConfiguration configuration)
        {
            this.context = context;
            this.configuration = configuration;
        }

        public async Task DeletedAt(int id)
        {
            var entity = await GetById(id);
            if (entity == null)
            {
                throw new Exception("Registro no encontrado");
            }
            entity.DeletedAt = DateTime.Now; 
            context.Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            var sql = @"SELECT
                Id,
                CONCAT(Name, ' - ', Description) AS TextoMostrar
            FROM
                UserRole
            WHERE DeletedAt IS NULL AND State = 1
            ORDER BY Id ASC";
            return await context.QueryAsync<DataSelectDto>(sql);
        }

        public async Task<UserRole> GetById(int id)
        {
            var sql = @"SELECT * FROM UserRole WHERE Id = @Id ORDER BY Id ASC";
            return await this.context.QueryFirstOrDefaultAsync<UserRole>(sql, new { Id = id });
        }

        public async Task<UserRole> Save(UserRole entity)
        {
            context.UserRole.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task Update(UserRole entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task<UserRole> GetByName(string name)
        {
            return await this.context.UserRole.AsNoTracking().Where(item => item.Name == name).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<UserRole>> GetAll()
        {
            var sql = @"SELECT * FROM UserRole ORDER BY Id ASC";
            return await this.context.QueryAsync<UserRole>(sql);
        }

        public async Task<IEnumerable<UserRole>> SelectAll()
        {
            /*var sql = @"SELECT * FROM UserRole  WHERE DeletedAt IS NULL AND state = 1
            ORDER BY Id ASC";*/
            var sql = @"SELECT * FROM UserRole 
                WHERE (DeletedAt IS NULL OR DeletedAt = '0001-01-01 00:00:00.000000') 
                AND state = 1
                ORDER BY Id ASC;";
            try
            {
                return await this.context.QueryAsync<UserRole>(sql);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al ejecutar la consulta ", ex);
            }
        }
    }

}
