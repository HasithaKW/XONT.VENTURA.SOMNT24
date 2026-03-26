using System;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using XONT.Common.Extensions;    // for GetObject/SetObject
using XONT.Common.Message;       // for MessageSet, MessageCreate
using XONT.VENTURA;              // for User
using XONT.VENTURA.SOMNT24;      // for ReturnTypeManager, Selection, ReturnType

namespace XONT.VENTURA.SOMNT24
{
    [Route("api/[controller]")]   // base route: api/SOMNT24
    [ApiController]
    public class SOMNT24Controller : ControllerBase
    {
        private readonly ReturnTypeManager _returnManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private User _user;
        private MessageSet _message;
        private string _update;

        public SOMNT24Controller(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _returnManager = new ReturnTypeManager();
        }

        // POST api/SOMNT24/ListReturnTypeData
        [HttpPost("ListReturnTypeData")]
        public IActionResult ListReturnTypeData(Selection selection)
        {
            try
            {
                _user = GetUser();
                selection.BusinessUnit = _user.BusinessUnit?.Trim();
                selection.ModuleCode = selection.ModuleCode?.Trim();
                selection.ModuleCodeDesc = selection.ModuleCodeDesc?.Trim();
                selection.RetnType = selection.RetnType?.Trim();
                selection.Description = selection.Description?.Trim();
                // FirstRow / LastRow are already set
                int totalRow = 0;

                DataTable selectedOrders = _returnManager.GetGridData(selection, out totalRow, ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, _message);

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
                DataTable dt = _returnManager.GetModulePromptData(_user.BusinessUnit?.Trim(), ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, _message);

                return Ok(dt);
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
                DataTable dt = _returnManager.GetModulePromptDataForNew(_user.BusinessUnit?.Trim(), ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, _message);

                return Ok(dt);
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
                DataTable dt = _returnManager.GetCategoryPromptData(_user.BusinessUnit?.Trim(), ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, _message);

                return Ok(dt);
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
                ReturnType retnType = _returnManager.SeletedReturnType(
                    _user.BusinessUnit?.Trim(), moduleCode, returnType, ref _message);

                if (_message != null && _message.HasErrors)
                    return StatusCode(500, _message);

                return Ok(retnType);
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
                        return StatusCode(500, msg);
                    }
                    else
                    {
                        // Insert
                        _returnManager.UpdateReturnType(_user.BusinessUnit?.Trim(), _user.UserName?.Trim(),
                                                        "1", rtnType, ref _message, ref _update);
                        if (_message != null && _message.HasErrors)
                            return StatusCode(500, _message);
                        success = _update == "1";
                    }
                }
                else
                {
                    // Update
                    _returnManager.UpdateReturnType(_user.BusinessUnit?.Trim(), _user.UserName?.Trim(),
                                                    "2", rtnType, ref _message, ref _update);
                    if (_message != null && _message.HasErrors)
                        return StatusCode(500, _message);

                    if (_update == "0")
                    {
                        success = false;
                        MessageSet msg = MessageCreate.CreateUserMessage(200042, "", "", "", "", "", "");
                        return StatusCode(500, msg);
                    }
                    else
                    {
                        success = true;
                    }
                }

                return Ok(success);
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
                dynamic formData = objectData.formData;

                if (formData.pageType == "edit")
                {
                    string existReturn = formData.ReturnType;
                    DataTable returntype = _returnManager.ExistTransactionBLL(
                        _user.BusinessUnit?.Trim(), existReturn, ref _message);

                    if (_message != null && _message.HasErrors)
                        return StatusCode(500, _message);

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
                return Ok(selected);
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
            return StatusCode(500, _message);
        }

        #region Error Handling
        private IActionResult GetErrorMessageResponse(MessageSet msg)
        {
            return StatusCode(500, msg);
        }

        private IActionResult GetErrorMessageResponse(Exception ex, string methodName)
        {
            _message = MessageCreate.CreateErrorMessage(0, ex, methodName, "XONT.VENTURA.SOMNT24.WEB.dll");
            return StatusCode(500, _message);
        }
        #endregion

        #region Get User from Session
        private User GetUser()
        {
            if (_user == null)
            {
                // Uses the extension method GetObject<T> (from XONT.Common.Extensions)
                _user = _httpContextAccessor.HttpContext.Session.GetObject<User>("Main_LoginUser");
            }
            return _user;
        }
        #endregion
    }
}