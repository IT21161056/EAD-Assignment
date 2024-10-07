using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UserRegisterDTO
    {
        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Phone { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public bool IsApproved { get; set; }
    }
    public class UserLoginDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class UserLoginResponseDTO
    {
        public string UserId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }

    public class UserUpdateDTO
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public bool Status { get; set; }
    }

    public class CreateVendorDTO : UserRegisterDTO
    {
        public decimal Rank { get; set; } = 0;
    }

    public class UpdateVendorDto : UserUpdateDTO
    {
        public decimal Rank { get; set; }
    }

}