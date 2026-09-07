using System;

namespace Entity.Dto
{
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
    }
}
