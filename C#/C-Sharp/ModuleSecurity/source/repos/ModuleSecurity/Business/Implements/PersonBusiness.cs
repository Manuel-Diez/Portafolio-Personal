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
    public class PersonBusiness : IPersonBusiness
    {
        protected readonly IPersonData data;

        public PersonBusiness(IPersonData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.Delete(id);
        }

        public async Task<IEnumerable<PersonDataDto>> GetAll()
        {
            IEnumerable<Person> people = await this.data.GetAll();
            var personDtos = people.Select(person => new PersonDataDto
            {
                Id = person.Id,
                First_name = person.First_name,
                Last_name = person.Last_name,
                Email = person.Email,
                PhoneNumber = person.Phonenumber
            });

            return personDtos;
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }

        public async Task<IEnumerable<Person>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<Person> Save(PersonDataDto entity)
        {
            Person person = new Person
            {
                CreatedAt = DateTime.Now.AddHours(-5)
            };
            person = this.MapData(person, entity);

            return await this.data.Save(person);
        }

        public async Task Update(PersonDataDto entity)
        {
            Person person = await this.data.GetById(entity.Id);
            if (person == null)
            {
                throw new Exception("Registro no encontrado");
            }
            person = this.MapData(person, entity);

            await this.data.Update(person);
        }

        public async Task<PersonDataDto> GetById(int id)
        {
            Person person = await this.data.GetById(id);
            PersonDataDto personDataDto = new PersonDataDto();

            personDataDto.Id = person.Id;
            personDataDto.First_name = person.First_name;
            personDataDto.Last_name = person.Last_name;
            personDataDto.Email = person.Email;
            personDataDto.PhoneNumber = person.Phonenumber;
            personDataDto.Birth_of_date = person.Birth_of_date;

            return personDataDto;
        }

        public Person MapData(Person person, PersonDataDto entity)
        {
            person.Id = entity.Id;
            person.First_name = entity.First_name;
            person.Last_name = entity.Last_name;
            person.Email = entity.Email;
            person.Adress = entity.Adress;
            person.Type_document = entity.Type_document;
            person.Document = entity.Document;
            person.Birth_of_date = entity.Birth_of_date;
            person.Phonenumber = entity.PhoneNumber;
            person.UpdatedAt = DateTime.Now;
            return person;
        }
    }
}
