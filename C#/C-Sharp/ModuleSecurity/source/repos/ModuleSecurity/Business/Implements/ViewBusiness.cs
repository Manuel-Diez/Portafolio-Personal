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
    public class ViewBusiness : IViewBusiness
    {
        protected readonly IViewData data;

        public ViewBusiness(IViewData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.Delete(id);
        }

        public async Task<IEnumerable<ViewDataDto>> GetAll()
        {
            IEnumerable<View> views = await this.data.GetAll();
            var viewDtos = views.Select(view => new ViewDataDto
            {
                Id = view.Id,
                Name = view.Name,
                Description = view.Description,
                /*State = view.State*/
            });

            return viewDtos;
        }


        public async Task<IEnumerable<View>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<View> Save(ViewDataDto entity)
        {
            View view = new View();
            view.CreatedAt = DateTime.UtcNow.AddHours(-5);
            view = this.MapData(view, entity);

            return await this.data.Save(view);
        }

        public async Task Update(ViewDataDto entity)
        {
            View view = await this.data.GetById(entity.Id);
            if (view == null)
            {
                throw new Exception("Registro no encontrado");
            }
            view = this.MapData(view, entity);

            await this.data.Update(view);
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }

        public async Task<ViewDataDto> GetById(int id)
        {
            View view = await this.data.GetById(id);
            ViewDataDto viewDto = new ViewDataDto
            {
                Id = view.Id,
                Name = view.Name,
                Description = view.Description,
                /*State = view.State*/
            };

            return viewDto;
        }

        public View MapData(View view, ViewDataDto entity)
        {
            view.Id = entity.Id;
            view.Name = entity.Name;
            view.Description = entity.Description;
            view.UpdatedAt = DateTime.Now;
            /*view.State = entity.State;*/
            return view;
        }
    }
}
