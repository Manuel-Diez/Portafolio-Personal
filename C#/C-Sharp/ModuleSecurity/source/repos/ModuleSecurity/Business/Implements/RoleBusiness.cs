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
    public class RoleBusiness : IRoleBusiness
    {
        protected readonly IRoleData data;

        public RoleBusiness(IRoleData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.Delete(id);
        }

        public async Task<IEnumerable<RoleDataDto>> GetAll()
        {
            IEnumerable<Role> roles = await this.data.GetAll();
            var roleDtos = roles.Select(role => new RoleDataDto
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description
            });

            return roleDtos;
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }

        public async Task<IEnumerable<Role>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<Role> Save(RoleDataDto entity)
        {
            Role role = new Role
            {
                CreatedAt = DateTime.Now.AddHours(-5)
            };
            role = this.MapData(role, entity);

            return await this.data.Save(role);
        }

        public async Task Update(RoleDataDto entity)
        {
            Role role = await this.data.GetById(entity.Id);
            if (role == null)
            {
                throw new Exception("Registro no encontrado");
            }
            role = this.MapData(role, entity);

            await this.data.Update(role);
        }

        public async Task<RoleDataDto> GetById(int id)
        {
            Role role = await this.data.GetById(id);
            RoleDataDto roleDto = new RoleDataDto
            {
                Id = role.Id,
                Name = role.Name,
                Description = role.Description
            };

            return roleDto;
        }

        public Role MapData(Role role, RoleDataDto entity)
        {
            role.Id = entity.Id;
            role.Name = entity.Name;
            role.Description = entity.Description;
            role.UpdatedAt = DateTime.Now;
            return role;
        }
    }
}
