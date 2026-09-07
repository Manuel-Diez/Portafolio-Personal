using Business.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity.Model.Security;
using Entity.Dto;
using Data.Interface;

namespace Business.Implements
{
    public class UserRoleBusiness : IUserRoleBusiness
    {
        protected readonly IUserRoleData data;

        public UserRoleBusiness(IUserRoleData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.DeletedAt(id);
        }

        public async Task<IEnumerable<UserRoleDataDto>> GetAll()
        {
            IEnumerable<UserRole> userRoles = await this.data.GetAll();
            var userRoleDtos = userRoles.Select(userRole => new UserRoleDataDto
            {
                Id = userRole.Id
            });

            return userRoleDtos;
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }

        public async Task<IEnumerable<UserRole>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<UserRole> Save(UserRoleDataDto entity)
        {
            UserRole userRole = new UserRole
            {
                CreatedAt = DateTime.UtcNow.AddHours(-5)
            };
            userRole = this.MapData(userRole, entity);

            return await this.data.Save(userRole);
        }

        public async Task Update(UserRoleDataDto entity)
        {
            UserRole userRole = await this.data.GetById(entity.Id);
            if (userRole == null)
            {
                throw new Exception("Registro no encontrado");
            }
            userRole = this.MapData(userRole, entity);

            await this.data.Update(userRole);
        }

        public async Task<UserRoleDataDto> GetById(int id)
        {
            UserRole userRole = await this.data.GetById(id);
            UserRoleDataDto userRoleDto = new UserRoleDataDto
            {
                Id = userRole.Id
            };

            return userRoleDto;
        }

        public UserRole MapData(UserRole userRole, UserRoleDataDto entity)
        {
            userRole.Id = entity.Id;
            userRole.Name = entity.Name;
            userRole.UserId = entity.UserId;
            userRole.RoleId = entity.RoleId;
            userRole.UpdatedAt = DateTime.Now;
            return userRole;
        }
    }
}

