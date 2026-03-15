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
    public class ModuleBusiness : IModuleBusiness
    {
        protected readonly IModuleData data;

        public ModuleBusiness(IModuleData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.Delete(id);
        }

        public async Task<IEnumerable<ModuleDataDto>> GetAll()
        {
            IEnumerable<Module> module = await this.data.GetAll();
            var moduleDtos = module.Select(module => new ModuleDataDto
            {
                Id = module.Id,
                Name = module.Name,
                Description = module.Description,
                /*State = module.State*/
            });

            return moduleDtos;
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }
        
        public async Task<IEnumerable<Module>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<Module> Save(ModuleDataDto entity)
        {
            Module module = new Module();
            module.CreatedAt = DateTime.Now.AddHours(-5);
            module = this.MapData(module, entity);
            /*module.Modulo = null;*/

            return await this.data.Save(module);
        }

        public async Task Update(ModuleDataDto entity)
        {
            Module module = await this.data.GetById(entity.Id);
            if (module == null)
            {
                throw new Exception("Registro no encontrado");
            }
            module = this.MapData(module, entity);

            await this.data.Update(module);
        }

        public async Task<ModuleDataDto> GetById(int id)
        {
            Module module = await this.data.GetById(id);
            ModuleDataDto moduleDataDto = new ModuleDataDto();

            moduleDataDto.Id = module.Id;
            moduleDataDto.Name = module.Name;
            moduleDataDto.Description = module.Description;
            /*State = module.State*/

            return moduleDataDto;
        }

        public Module MapData(Module module, ModuleDataDto entity)
        {
            module.Id = entity.Id;
            module.Name = entity.Name;
            module.Description = entity.Description;
            module.UpdatedAt = DateTime.Now;
            /*module.State = entity.State;*/
            return module;
        }

        
    }
}
