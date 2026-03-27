using System;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using XONT.Common.Extensions;
using XONT.Common.Message;
using XONT.VENTURA;
using XONT.VENTURA.SOMNT24;

namespace XONT.VENTURA.SOMNT24
{
    [Route("api/[controller]")]
    [ApiController]
    public class SOMNT24Controller : ControllerBase
    {
        private readonly ReturnTypeManager _returnManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        private User _user;
        private MessageSet _message;
        private string _update;

        public SOMNT24Controller(IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _returnManager = new ReturnTypeManager();
        }

        [HttpGet("")]
        public IActionResult Welcome()
        {
            return Ok(new
            {
                message = "SOMNT24 API is running",
                version = "1.0",
                endpoints = new[]
                {
            "/api/SOMNT24/GetModulePromptData",
            "/api/SOMNT24/GetCategoryPromptData",
            "/api/SOMNT24/ListReturnTypeData",
            "/api/SOMNT24/SeletedReturnType",
            "/api/SOMNT24/test-connection",
            "/api/SOMNT24/debug-full"
        }
            });
        }


        // Test database connection
        [HttpGet("test-connection")]
        public IActionResult TestConnection()
        {
            try
            {
                var connectionString = _configuration.GetConnectionString("UserDB");

                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (var command = new SqlCommand("SELECT TOP 1 * FROM ReturnType", connection))
                    {
                        var reader = command.ExecuteReader();
                        var hasData = reader.HasRows;

                        return Ok(new
                        {
                            success = true,
                            message = "Database connected successfully",
                            database = connection.Database,
                            hasReturnTypes = hasData
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }

        // Debug full - test user, database, and stored procedure

        [HttpGet("debug-full")]
        public IActionResult DebugFull()
        {
            try
            {
                // Get user
                var user = GetUser();

                // Test database connection
                var connectionString = _configuration.GetConnectionString("UserDB");

                // Use separate variables with explicit types
                bool dbSuccess = false;
                string dbMessage = "";
                string dbName = "";

                try
                {
                    using (var connection = new SqlConnection(connectionString))
                    {
                        connection.Open();
                        dbSuccess = true;
                        dbMessage = "Database connected";
                        dbName = connection.Database;
                    }
                }
                catch (Exception ex)
                {
                    dbSuccess = false;
                    dbMessage = ex.Message;
                    dbName = "";
                }

                // Test stored procedure
                bool spSuccess = false;
                string spMessage = "";
                int spRowCount = 0;

                try
                {
                    using (var connection = new SqlConnection(connectionString))
                    {
                        connection.Open();
                        using (var command = new SqlCommand("[RD].[usp_SOMNT24GetAllData]", connection))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@BusinessUnit", user?.BusinessUnit ?? "LUCK");
                            command.Parameters.AddWithValue("@ExecutionType", "1");

                            using (var reader = command.ExecuteReader())
                            {
                                var dt = new DataTable();
                                dt.Load(reader);
                                spSuccess = true;
                                spMessage = "Stored procedure executed";
                                spRowCount = dt.Rows.Count;
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    spSuccess = false;
                    spMessage = ex.Message;
                    spRowCount = 0;
                }

                // Return the result
                return Ok(new
                {
                    user = new
                    {
                        exists = user != null,
                        userName = user?.UserName,
                        businessUnit = user?.BusinessUnit
                    },
                    database = new
                    {
                        success = dbSuccess,
                        message = dbMessage,
                        database = dbName
                    },
                    storedProcedure = new
                    {
                        success = spSuccess,
                        message = spMessage,
                        rowCount = spRowCount
                    },
                    connectionString = connectionString?.Replace("Password=StrongPassword123!", "Password=********")
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = ex.Message,
                    stackTrace = ex.StackTrace,
                    innerException = ex.InnerException?.Message
                });
            }
        }

        // POST api/SOMNT24/ListReturnTypeData
        [HttpPost("ListReturnTypeData")]
        public IActionResult ListReturnTypeData(Selection selection)
        {
            try
            {
                _user = GetUser();

                if (_user == null)
                {
                    return BadRequest(new { error = "User not found in session" });
                }

                selection.BusinessUnit = _user.BusinessUnit?.Trim();
                selection.ModuleCode = selection.ModuleCode?.Trim();
                selection.ModuleCodeDesc = selection.ModuleCodeDesc?.Trim();
                selection.RetnType = selection.RetnType?.Trim();
                selection.Description = selection.Description?.Trim();
                int totalRow = 0;

                DataTable selectedOrders = _returnManager.GetGridData(selection, out totalRow, ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, new { error = _message.Errors });

                return Ok(new { data = selectedOrders, totalRow });
            }
            catch (Exception ex)
            {
                return GetErrorMessageResponse(ex, "ListReturnTypeData");
            }
        }

        // GET api/SOMNT24/GetModulePromptData
        [HttpGet("GetModulePromptData")]
        public IActionResult GetModulePromptData()
        {
            try
            {
                _user = GetUser();

                if (_user == null)
                {
                    return BadRequest(new { error = "User not found in session" });
                }

                DataTable dt = _returnManager.GetModulePromptData(_user.BusinessUnit?.Trim(), ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, new { error = _message.Errors });

                return Ok(new { data = dt });
            }
            catch (Exception ex)
            {
                return GetErrorMessageResponse(ex, "GetModulePromptData");
            }
        }

        // GET api/SOMNT24/GetModulePromptDataForNew
        [HttpGet("GetModulePromptDataForNew")]
        public IActionResult GetModulePromptDataForNew()
        {
            try
            {
                _user = GetUser();

                if (_user == null)
                {
                    return BadRequest(new { error = "User not found in session" });
                }

                DataTable dt = _returnManager.GetModulePromptDataForNew(_user.BusinessUnit?.Trim(), ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, new { error = _message.Errors });

                return Ok(new { data = dt });
            }
            catch (Exception ex)
            {
                return GetErrorMessageResponse(ex, "GetModulePromptDataForNew");
            }
        }

        // GET api/SOMNT24/GetCategoryPromptData
        [HttpGet("GetCategoryPromptData")]
        public IActionResult GetCategoryPromptData()
        {
            try
            {
                _user = GetUser();

                if (_user == null)
                {
                    return BadRequest(new { error = "User not found in session" });
                }

                DataTable dt = _returnManager.GetCategoryPromptData(_user.BusinessUnit?.Trim(), ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, new { error = _message.Errors });

                return Ok(new { data = dt });
            }
            catch (Exception ex)
            {
                return GetErrorMessageResponse(ex, "GetCategoryPromptData");
            }
        }

        // GET api/SOMNT24/SeletedReturnType
        [HttpGet("SeletedReturnType")]
        public IActionResult SeletedReturnType(string moduleCode, string returnType)
        {
            try
            {
                _user = GetUser();

                if (_user == null)
                {
                    return BadRequest(new { error = "User not found in session" });
                }

                ReturnType retnType = _returnManager.SeletedReturnType(
                    _user.BusinessUnit?.Trim(), moduleCode, returnType, ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, new { error = _message.Errors });

                return Ok(new { data = retnType });
            }
            catch (Exception ex)
            {
                return GetErrorMessageResponse(ex, "SeletedReturnType");
            }
        }

        // POST api/SOMNT24/InsertReturnType
        [HttpPost("InsertReturnType")]
        public IActionResult InsertReturnType([FromBody] object formData)
        {
            bool success = false;
            try
            {
                dynamic returnData = formData;
                _user = GetUser();

                if (_user == null)
                {
                    return BadRequest(new { error = "User not found in session" });
                }

                ReturnType rtnType = new ReturnType
                {
                    BusinessUnit = _user.BusinessUnit?.Trim(),
                    ModuleCode = returnData.ModuleCode.ToString().Trim(),
                    RetnType = returnData.ReturnType.ToString().Trim(),
                    Description = returnData.Description.ToString().Trim(),
                    ReturnCategory = returnData.ReturnCategory.ToString().Trim(),
                    TimeStamp = (byte[])returnData.TimeStamp,
                    ProcessingRequired = (returnData.SalableReturn == true) ? "1" : "0",
                    Status = (returnData.Active == true) ? "1" : "0",
                    ReturnDeductionType = (returnData.DeductFromSales == true) ? "1" : "0"
                };

                string validation = returnData.ReturnValueValidation.ToString();
                rtnType.ValidateReturnValue = validation switch
                {
                    "No" => "0",
                    "Mandatory" => "1",
                    _ => "2"
                };

                if (returnData.pageType == "new" || returnData.pageType == "newBasedOn")
                {
                    // Check existence
                    ReturnType existing = _returnManager.SeletedReturnType(
                        _user.BusinessUnit?.Trim(), rtnType.ModuleCode, rtnType.RetnType, ref _message);
                    if (existing.RetnType != null)
                    {
                        success = false;
                        MessageSet msg = MessageCreate.CreateUserMessage(200011, "Return Type", "", "", "", "", "");
                        return StatusCode(500, new { error = msg });
                    }
                    else
                    {
                        // Insert
                        _returnManager.UpdateReturnType(_user.BusinessUnit?.Trim(), _user.UserName?.Trim(),
                                                        "1", rtnType, ref _message, ref _update);
                        if (_message != null && _message.HasErrors)
                            return StatusCode(500, new { error = _message });
                        success = _update == "1";
                    }
                }
                else
                {
                    // Update
                    _returnManager.UpdateReturnType(_user.BusinessUnit?.Trim(), _user.UserName?.Trim(),
                                                    "2", rtnType, ref _message, ref _update);
                    if (_message != null && _message.HasErrors)
                        return StatusCode(500, new { error = _message });

                    if (_update == "0")
                    {
                        success = false;
                        MessageSet msg = MessageCreate.CreateUserMessage(200042, "", "", "", "", "", "");
                        return StatusCode(500, new { error = msg });
                    }
                    else
                    {
                        success = true;
                    }
                }

                return Ok(new { success = success });
            }
            catch (Exception ex)
            {
                return GetErrorMessageResponse(ex, "InsertReturnType");
            }
        }

        // POST api/SOMNT24/ExistTransaction
        [HttpPost("ExistTransaction")]
        public IActionResult ExistTransaction([FromBody] dynamic objectData)
        {
            string selected = "";
            try
            {
                _user = GetUser();

                if (_user == null)
                {
                    return BadRequest(new { error = "User not found in session" });
                }

                dynamic formData = objectData.formData;

                if (formData.pageType == "edit")
                {
                    string existReturn = formData.ReturnType;
                    DataTable returntype = _returnManager.ExistTransactionBLL(
                        _user.BusinessUnit?.Trim(), existReturn, ref _message);

                    if (_message != null && _message.HasErrors)
                        return StatusCode(500, new { error = _message });

                    if (returntype.Rows.Count > 0)
                    {
                        string validation = formData.ReturnValueValidation;
                        selected = validation switch
                        {
                            "No" => "0",
                            "Mandatory" => "1",
                            "WithConfirmation" => "2",
                            _ => ""
                        };
                    }
                }
                return Ok(new { selected = selected });
            }
            catch (Exception ex)
            {
                return GetErrorMessageResponse(ex, "ExistTransaction");
            }
        }

        // GET api/SOMNT24/GetDisplayErrorMessage
        [HttpGet("GetDisplayErrorMessage")]
        public IActionResult GetDisplayErrorMessage()
        {
            _message = MessageCreate.CreateUserMessage(200045, "", "", "", "", "", "");
            return StatusCode(500, new { error = _message });
        }

        #region Error Handling
        private IActionResult GetErrorMessageResponse(MessageSet msg)
        {
            return StatusCode(500, new { error = msg });
        }

        private IActionResult GetErrorMessageResponse(Exception ex, string methodName)
        {
            _message = MessageCreate.CreateErrorMessage(0, ex, methodName, "XONT.VENTURA.SOMNT24.WEB.dll");
            return StatusCode(500, new { error = _message, details = ex.Message });
        }
        #endregion

        #region Get User from Session
        private User GetUser()
        {
            if (_user == null)
            {
                try
                {
                    _user = _httpContextAccessor.HttpContext?.Session?.GetObject<User>("Main_LoginUser");

                    if (_user == null)
                    {
                        // Simple test user without extra properties
                        _user = new User
                        {
                            UserName = "xontadmin",
                            BusinessUnit = "LUCK"
                        };

                        _httpContextAccessor.HttpContext?.Session?.SetObject("Main_LoginUser", _user);
                        _httpContextAccessor.HttpContext?.Session?.SetString("Main_UserName", "xontadmin");
                        _httpContextAccessor.HttpContext?.Session?.SetString("Main_BusinessUnit", "LUCK");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error getting user: {ex.Message}");
                    _user = new User
                    {
                        UserName = "xontadmin",
                        BusinessUnit = "LUCK"
                    };
                }
            }
            return _user;
        }
        #endregion
    }
}