using Business.Interface;
using Data.Interface;
using Entity.Dto;
using Entity.Model.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Business.Implements
{
    public class CityBusiness : ICityBusiness
    {
        private protected readonly ICityData data;

        public CityBusiness(ICityData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.Delete(id);
        }

        public async Task<IEnumerable<CityDataDto>> GetAll()
        {
            IEnumerable<City> city = await this.data.GetAll();
            var cityDtos = city.Select(city => new CityDataDto
            {
                Id = city.Id,
                Citys = city.Citys,
                Country = city.Country,
                /*State = location.State*/
            });

            return cityDtos;
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }

        public async Task<IEnumerable<City>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<City> Save(CityDataDto entity)
        {
            City city = new City();
            city.CreatedAt = DateTime.Now.AddHours(-5);
            city = this.MapData(city, entity);
            /*city.Modulo = null;*/

            return await this.data.Save(city);
        }

        public async Task Update(CityDataDto entity)
        {
            City city = await this.data.GetById(entity.Id);
            if (city == null)
            {
                throw new Exception("Registro no encontrado");
            }
            city = this.MapData(city, entity);

            await this.data.Update(city);
        }

        public async Task<CityDataDto> GetById(int id)
        {
            City city = await this.data.GetById(id);
            CityDataDto cityDataDto = new CityDataDto();

            cityDataDto.Id = city.Id;
            cityDataDto.Citys = city.Citys;
            cityDataDto.Country = city.Country;

            return cityDataDto;
        }

        public City MapData(City city, CityDataDto entity)
        {
            city.Id = entity.Id;
            city.Citys = entity.Citys;
            city.Country = entity.Country;
            city.State_Department = entity.State_Department;
            city.PostalCode = entity.PostalCode;
            city.State = entity.State;
            city.UpdatedAt = DateTime.Now;
            return city;
        }
    }

}
