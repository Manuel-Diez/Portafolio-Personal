using Business.Interface;
using Data.Interface;
using Entity.Dto;
using Entity.Model.Security;
using Microsoft.AspNetCore.Identity;

namespace Business.Implements
{
    public class UserBusiness : IUserBusiness
    {
        protected readonly IUserData data;

        public UserBusiness(IUserData data)
        {
            this.data = data;
        }

        public async Task Delete(int id)
        {
            await this.data.Delete(id);
        }

        public async Task<IEnumerable<UserDataDto>> GetAll()
        {
            IEnumerable<User> users = await this.data.GetAll();
            var userDtos = users.Select(user => new UserDataDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName,
                PersonId = user.PersonId
            });

            return userDtos;
        }

        public async Task<IEnumerable<DataSelectDto>> GetAllSelect()
        {
            return await this.data.GetAllSelect();
        }

        public async Task<IEnumerable<User>> SelectAll()
        {
            return await this.data.SelectAll();
        }

        public async Task<User> Save(UserDataDto entity)
        {
            User user = new User
            {
                CreatedAt = DateTime.Now.AddHours(-5)
            };
            user = this.MapData(user, entity);

            return await this.data.Save(user);
        }

        public async Task Update(UserDataDto entity)
        {
            var user = await this.data.GetById(entity.Id);
            if (user == null)
            {
                throw new Exception("Registro no encontrado");
            }
            user = this.MapData(user, entity);

            await this.data.Update(user);
        }

        public async Task<UserDataDto> GetById(int id)
        {
            User user = await this.data.GetById(id);
            UserDataDto userDto = new UserDataDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                FullName = user.FullName
            };

            return userDto;
        }

        public User MapData(User user, UserDataDto entity)
        {
            user.Id = entity.Id;
            user.UserName = entity.UserName;
            user.Email = entity.Email;
            user.FullName = entity.FullName;

            // Solo asigna la contraseña si se proporciona
            if (!string.IsNullOrEmpty(entity.Password))
            {
                var passwordHasher = new PasswordHasher<User>();
                user.Password = passwordHasher.HashPassword(user, entity.Password);
            }

            user.PersonId = entity.PersonId;
            user.UpdatedAt= DateTime.Now;
            return user;
        }
    }
}
