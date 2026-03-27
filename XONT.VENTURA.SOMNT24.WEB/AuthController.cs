using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;

namespace XONT.VENTURA.SOMNT24.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IConfiguration _configuration;

    // Session keys — same keys used throughout the original codebase
    private const string KEY_USERNAME = "Main_UserName";
    private const string KEY_LOGIN_USER = "Main_LoginUser";
    private const string KEY_BUSINESS_UNIT = "Main_BusinessUnit";
    private const string KEY_THEME = "Theme";
    private const string KEY_LANGUAGE = "Main_Language";

    public AuthController(ILogger<AuthController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    // ── POST api/auth/login ───────────────────────────────
    // Angular LoginComponent calls this with { userName, password }
    // Returns user info; browser stores session cookie automatically.
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.UserName) ||
            string.IsNullOrWhiteSpace(request?.Password))
        {
            return BadRequest(new ApiResponse<object>
            {
                Success = false,
                Message = "Username and password are required."
            });
        }

        // ⚠️ REPLACE THIS with your real user validation
        // Query your UserDB against the existing XONT user table
        // Example: var user = _userService.Validate(request.UserName, request.Password);
        var user = ValidateUser(request.UserName, request.Password);

        if (user == null)
        {
            _logger.LogWarning("Failed login attempt for user {UserName}", request.UserName);
            return Unauthorized(new ApiResponse<object>
            {
                Success = false,
                Message = "Invalid username or password."
            });
        }

        // Set session values — same keys as original Global.asax Session_Start
        HttpContext.Session.SetString(KEY_USERNAME, user.UserName);
        HttpContext.Session.SetString(KEY_BUSINESS_UNIT, user.BusinessUnit);
        HttpContext.Session.SetString(KEY_THEME, "Blue");
        HttpContext.Session.SetString(KEY_LANGUAGE, "English");

        // Serialize the user object into session (stored as JSON string)
        HttpContext.Session.SetString(KEY_LOGIN_USER, System.Text.Json.JsonSerializer.Serialize(user));

        _logger.LogInformation("User {UserName} logged in. BusinessUnit={BusinessUnit}",
            user.UserName, user.BusinessUnit);

        return Ok(new ApiResponse<SessionUser>
        {
            Success = true,
            Data = new SessionUser
            {
                UserName = user.UserName,
                BusinessUnit = user.BusinessUnit,
                UserLevelGroup = user.UserLevelGroup,
                PowerUser = user.PowerUser
            }
        });
    }

    // ── GET api/auth/session ──────────────────────────────
    // Called by Angular AuthService.checkSession() on app start / browser refresh.
    // Returns current session user if alive, 401 if not.
    [HttpGet("session")]
    public IActionResult GetSession()
    {
        var userName = HttpContext.Session.GetString(KEY_USERNAME);

        if (string.IsNullOrEmpty(userName))
        {
            return Unauthorized(new ApiResponse<object>
            {
                Success = false,
                Message = "No active session."
            });
        }

        var businessUnit = HttpContext.Session.GetString(KEY_BUSINESS_UNIT) ?? string.Empty;

        return Ok(new ApiResponse<SessionUser>
        {
            Success = true,
            Data = new SessionUser
            {
                UserName = userName,
                BusinessUnit = businessUnit,
                UserLevelGroup = "USER",
                PowerUser = "1"
            }
        });
    }

    // ── POST api/auth/logout ──────────────────────────────
    // Angular AuthService.logout() calls this → clears the server session.
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        var userName = HttpContext.Session.GetString(KEY_USERNAME);
        HttpContext.Session.Clear();
        _logger.LogInformation("User {UserName} logged out.", userName ?? "unknown");
        return Ok();
    }

    // ── Private: User Validation ──────────────────────────
    // ⚠️ REPLACE with real DB lookup
    // Original: Session_Start hardcoded xontadmin / LUCK
    private static UserRecord? ValidateUser(string userName, string password)
    {
        // TODO: Replace with: SELECT * FROM [dbo].[Users] WHERE UserName=@u AND Password=@p
        // Use your existing XONT user authentication table in UserDB

        // Temporary — preserves the hardcoded dev user from original Global.asax Session_Start
        if (userName.Equals("xontadmin", StringComparison.OrdinalIgnoreCase) && password == "admin")
        {
            return new UserRecord
            {
                UserName = "xontadmin",
                PowerUser = "1",
                BusinessUnit = "LUCK",
                UserLevelGroup = "USER"
            };
        }
        return null;
    }
}

// ── DTOs ──────────────────────────────────────────────────

public record LoginRequest(string UserName, string Password);

public class SessionUser
{
    public string UserName { get; set; } = string.Empty;
    public string BusinessUnit { get; set; } = string.Empty;
    public string UserLevelGroup { get; set; } = string.Empty;
    public string PowerUser { get; set; } = string.Empty;
}

public class UserRecord
{
    public string UserName { get; set; } = string.Empty;
    public string PowerUser { get; set; } = string.Empty;
    public string BusinessUnit { get; set; } = string.Empty;
    public string UserLevelGroup { get; set; } = string.Empty;
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public string? Message { get; set; }
}
