using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        public AuthService(IUserRepository userRepository, IConfiguration configuration, EmailService emailService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<IdentityResult> Register(UserRegisterDTO userRegisterDTO)
        {
            // Validate role and send email for vendor or user registration
            if (userRegisterDTO.Role == "vendor" || userRegisterDTO.Role == "user")
            {
                var emailDTO = new EmailDTO
                {
                    ToEmail = userRegisterDTO.Email,
                    Subject = $"Registration as a {userRegisterDTO.Role}",
                    Body = $@"
                <h1>Welcome {userRegisterDTO.Firstname} {userRegisterDTO.Lastname},</h1>
                <p>We are excited to inform you that your registration request as a <strong>{userRegisterDTO.Role}</strong> has been received successfully.</p>
                <p>Your account is currently under review by our administration team for approval.</p>
                <p>You will receive an email once your registration has been reviewed and approved. Thank you for your patience.</p>
                <br/>
                <p>Best regards,</p>
                <p>The Admin Team</p>"
                };

                await SendEmail(emailDTO);
            }

            // Create the user with the IsApproved flag set to false
            var user = new User
            {
                Firstname = userRegisterDTO.Firstname,
                Lastname = userRegisterDTO.Lastname,
                Email = userRegisterDTO.Email,
                UserName = userRegisterDTO.Email,
                Phone = userRegisterDTO.Phone,
                Role = userRegisterDTO.Role,
                IsApproved = false // User needs admin approval
            };

            // Create the user in the repository
            return await _userRepository.CreateUserAsync(user, userRegisterDTO.Password);
        }


        public async Task<UserLoginResponseDTO> Login(UserLoginDTO userLoginDTO)
        {
            var user = await _userRepository.FindByEmailAsync(userLoginDTO.Email);
            if (user != null && await _userRepository.CheckPasswordAsync(user, userLoginDTO.Password))
            {
                var token = GenerateJwtToken(user);

                return new UserLoginResponseDTO
                {
                    UserId = user.Id.ToString(),
                    Firstname = user.Firstname,
                    Lastname = user.Lastname,
                    Role = user.Role,
                    Token = token
                };
            }

            return null;
        }

        public async Task Logout()
        {
            await _userRepository.Logout();
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<IdentityResult> UpdateUser(string userId, UserUpdateDTO userUpdateDTO)
        {
            var user = await _userRepository.FindByIdAsync(userId);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            user.Firstname = userUpdateDTO.Firstname ?? user.Firstname;
            user.Lastname = userUpdateDTO.Lastname ?? user.Lastname;
            user.Phone = userUpdateDTO.Phone ?? user.Phone;
            user.IsApproved = userUpdateDTO.Status;

            return await _userRepository.UpdateUserAsync(user);
        }

        public async Task SendEmail(EmailDTO emailDTO)
        {
            await _emailService.SendEmailAsync(emailDTO);
        }


    }
}
