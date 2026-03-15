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
    public class RolViewBusiness : IRoleViewBusiness
    {
        protected readonly IRoleViewData data;

        public RolViewBusiness(IRoleViewData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.Delete(id);
        }

        public async Task<IEnumerable<RoleViewDataDto>> GetAll()
        {
            IEnumerable<RoleView> rolViews = await this.data.GetAll();
            var rolViewDtos = rolViews.Select(rolView => new RoleViewDataDto
            {
                Id = rolView.Id
            });

            return rolViewDtos;
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }

        public async Task<IEnumerable<RoleView>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<RoleView> Save(RoleViewDataDto entity)
        {
            RoleView roleView = new RoleView
            {
                CreatedAt = DateTime.UtcNow.AddHours(-5)
            };
            roleView = this.MapData(roleView, entity);

            return await this.data.Save(roleView);
        }

        public async Task Update(RoleViewDataDto entity)
        {
            RoleView rolView = await this.data.GetById(entity.Id);
            if (rolView == null)
            {
                throw new Exception("Registro no encontrado");
            }
            rolView = this.MapData(rolView, entity);

            await this.data.Update(rolView);
        }

        public async Task<RoleViewDataDto> GetById(int id)
        {
            RoleView rolView = await this.data.GetById(id);
            RoleViewDataDto rolViewDto = new RoleViewDataDto
            {
                Id = rolView.Id
            };

            return rolViewDto;
        }

        public RoleView MapData(RoleView rolView, RoleViewDataDto entity)
        {
            rolView.Id = entity.Id;
            rolView.Description = entity.Description;
            rolView.RoleId = entity.RoleId;
            rolView.ViewId = entity.ViewId;
            rolView.UpdatedAt = DateTime.Now;
            return rolView;
        }
    }
}
