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
    public class RoleViewData : IRoleViewData
    {
        private readonly ApplicationDBContext context;
        protected readonly IConfiguration configuration;

        public RoleViewData(ApplicationDBContext context, IConfiguration configuration)
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
            context.Update(entity);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            var sql = @"SELECT
                Id,
                CONCAT(Name, ' - ', Description) AS TextoMostrar
            FROM
                RoleView
            WHERE Deleted_at IS NULL AND State = 1
            ORDER BY Id ASC";
            return await context.QueryAsync<DataSelectDto>(sql);
        }

        public async Task<RoleView> GetById(int id)
        {
            var sql = @"SELECT * FROM RoleView WHERE Id = @Id ORDER BY Id ASC";
            return await this.context.QueryFirstOrDefaultAsync<RoleView>(sql, new { Id = id });
        }

        public async Task<RoleView> Save(RoleView entity)
        {
            context.RoleView.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task Update(RoleView entity)
        {
            context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task<RoleView> GetByName(string description)
        {
            return await this.context.RoleView.AsNoTracking().Where(item => item.Description == description).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<RoleView>> GetAll()
        {
            var sql = @"SELECT * FROM RoleView ORDER BY Id ASC";
            return await this.context.QueryAsync<RoleView>(sql);
        }

        public async Task<IEnumerable<RoleView>> SelectAll()
        {
            /*var sql = @"SELECT * FROM RoleView  WHERE DeletedAt IS NULL AND state = 1
            ORDER BY Id ASC";*/
            var sql = @"SELECT * FROM Roleview 
                WHERE (DeletedAt IS NULL OR DeletedAt = '0001-01-01 00:00:00.000000') 
                AND state = 1
                ORDER BY Id ASC;";
            try
            {
                return await this.context.QueryAsync<RoleView>(sql);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error al ejecutar la consulta ", ex);
            }
        }
    }

}
