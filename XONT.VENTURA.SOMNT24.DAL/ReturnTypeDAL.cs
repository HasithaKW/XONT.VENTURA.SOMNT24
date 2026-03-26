using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Transactions;
using XONT.Common.Data;
using XONT.Common.Message;
//using XONT.VENTURA.V2TRN01;

namespace XONT.VENTURA.SOMNT24
{
   public  class ReturnTypeDAL
    {
        private readonly CommonDBService dbService;
        private DataTable dTable;
        private ParameterSet _common;
        private ReturnType rtnType;

        public ReturnTypeDAL()
        {
            dbService = new CommonDBService(); 
        }
        
        //ExecutionType = 6
        public DataTable ExistTransactionDAL(string businessUnit, string ExistReturn, ref MessageSet message)
        {
            DataTable dtresult = null;
            message = null;
            try
            {
                ParameterSet param = new ParameterSet();
                var spParametersList = new List<SPParameter>();
                param.SetSPParameterList(spParametersList, "BusinessUnit", businessUnit, "");
                param.SetSPParameterList(spParametersList, "ReturnType", ExistReturn, "");
                param.SetSPParameterList(spParametersList, "ExecutionType", '7', "");
                dbService.StartService();
                dtresult = dbService.FillDataTable(CommonVar.DBConName.UserDB, "[RD].[usp_SOMNT24GetAllData]", spParametersList);

            }
            catch (Exception ex)
            {
                message = MessageCreate.CreateErrorMessage(0, ex, "ExistTransactionDAL", "XONT.VENTURA.SOMNT24.DAL");
            }
            finally {
                dbService.CloseService();
            }
            
            return dtresult;
        }
        

        //ExecutionType = 6
        public ReturnType SeletedReturnType(string businessUnit, string moduleCode, string returnType,ref MessageSet _msg)
        {
              dbService.StartService();
            try
            {
                ParameterSet param = new ParameterSet();
                var spParametersList = new List<SPParameter>();
                param.SetSPParameterList(spParametersList, "BusinessUnit", businessUnit, "");
                param.SetSPParameterList(spParametersList, "ReturnType", returnType, "");
                param.SetSPParameterList(spParametersList, "ModuleCode", moduleCode, "");
                param.SetSPParameterList(spParametersList, "ExecutionType", '6', "");

                rtnType = new ReturnType();
                dTable = new DataTable("DataTable");
                dTable = dbService.FillDataTable(CommonVar.DBConName.UserDB, "[RD].[usp_SOMNT24GetAllData]", spParametersList);
                foreach (DataRow dtRow in dTable.Rows)
                {
                    rtnType.ModuleCode = dtRow["ModuleCode"].ToString().Trim();
                    rtnType.ModuleCodeDesc = dtRow["ModuleCodeDesc"].ToString().Trim();
                    rtnType.RetnType = dtRow["ReturnType"].ToString().Trim();
                    rtnType.Description = dtRow["Description"].ToString().Trim();
                    rtnType.ReturnCategory = dtRow["ReturnCategory"].ToString().Trim();
                    rtnType.ReturnCategoryDesc = dtRow["ReturnCategoryDesc"].ToString().Trim();
                    rtnType.ProcessingRequired = dtRow["ProcessingRequired"].ToString().Trim();
                    rtnType.Status = dtRow["Status"].ToString().Trim();
                    rtnType.TimeStamp = (byte[])dtRow["TimeStamp"];
                    rtnType.ReturnDeductionType = dtRow["ReturnDeductionType"].ToString().Trim();
                    rtnType.ValidateReturnValue = dtRow["ValidateReturnValue"].ToString().Trim();
                }
            }
            catch (Exception ex)
            {
                _msg = MessageCreate.CreateErrorMessage(0, ex, "SeletedReturnType", "XONT.VENTURA.SOMNT24.DAL.dll");
            }
            finally {
                dbService.CloseService();
            }
            return rtnType;
        }

        public void UpdateReturnType(string businessUnit, string userName, string executionType, ReturnType rtnType, ref MessageSet _msg,ref string update)
        {
            try
            {
                dbService.StartService();
                string commandText = "";

                using (var ts = new TransactionScope(TransactionScopeOption.Required))
                {
                    _common = new ParameterSet();
                    var spParametersList = new List<SPParameter>();

                    _common.SetSPParameterList(spParametersList, "BusinessUnit", businessUnit, "");
                    _common.SetSPParameterList(spParametersList, "ModuleCode", rtnType.ModuleCode.Trim(), "");
                     _common.SetSPParameterList(spParametersList,"ReturnType", rtnType.RetnType.ToString().Trim(), "");
                    _common.SetSPParameterList(spParametersList, "Description", rtnType.Description.ToString().Trim(), "");
                    _common.SetSPParameterList(spParametersList, "ReturnCategory", rtnType.ReturnCategory.ToString().Trim(), "");
                    _common.SetSPParameterList(spParametersList, "ProcessingRequired", rtnType.ProcessingRequired.ToString().Trim(), "");
                    _common.SetSPParameterList(spParametersList, "Status", rtnType.Status.ToString().Trim(), "");
                    _common.SetSPParameterList(spParametersList, "CreatedBy", userName, "");
                    _common.SetSPParameterList(spParametersList, "LastUpdatedBy", userName, "");
                    _common.SetSPParameterList(spParametersList, "ExecutionType", executionType, "");
                    _common.SetSPParameterList(spParametersList, "TimeStamp", rtnType.TimeStamp, "");
                    _common.SetSPParameterList(spParametersList, "ReturnDeductionType", rtnType.ReturnDeductionType.ToString(), ""); 
                    _common.SetSPParameterList(spParametersList, "ValidateReturnValue", rtnType.ValidateReturnValue.Trim(),"");//SO001

                    commandText = "RD.usp_SOMNT24UpdateReturnType"; 
                    int i = dbService.ExcecuteWithReturn(CommonVar.DBConName.UserDB, commandText, spParametersList);
                    if (i <= 0)
                    {
                        update = "0";
                    }
                    else
                    {
                        update = "1";
                    }

                    if (update == "1")
                    {
                        if (rtnType.ModuleCode.Trim() == "RD")
                        {
                            IWebControlManager webContol = new WebControlManager();
                            webContol.UpdateWebControl(businessUnit, userName, "", "RD.ReturnType", "Return Type", "", "", ref _msg);
                            if (_msg != null)
                            {
                                return;
                            }
                        }
                    }

                    ts.Complete();
                }
            }
            catch (Exception ex)
            {
                _msg = MessageCreate.CreateErrorMessage(0, ex, "UpdateReturnType", "XONT.VENTURA.SOMNT24.DAL.dll");
            }
            finally
            {
                dbService.CloseService();
            }
        }

        //ExecutionType = 2
        public DataTable GetGridData(Selection selected, out int rowCount, ref MessageSet msg)
        {
            
            rowCount = 0;

            try
            {
                dbService.StartService();
                ParameterSet param = new ParameterSet();
                var spParametersList = new List<SPParameter>();
                param.SetSPParameterList(spParametersList, "BusinessUnit", selected.BusinessUnit.ToString(), "");
                param.SetSPParameterList(spParametersList, "ReturnType", selected.RetnType, "");
                param.SetSPParameterList(spParametersList, "Description", selected.Description, "");
                param.SetSPParameterList(spParametersList, "ModuleCode", selected.ModuleCode, "");
                param.SetSPParameterList(spParametersList, "ModuleCodeDesc", selected.ModuleCodeDesc, "");
                param.SetSPParameterList(spParametersList, "FirstRow",selected.FirstRow, "");
                param.SetSPParameterList(spParametersList, "LastRow", selected.LastRow, "");
                if (selected.Status) {
                    param.SetSPParameterList(spParametersList, "Status", 1, "");
                }
                param.SetSPParameterList(spParametersList, "ExecutionType", '2', ""); 
                dTable = new DataTable("DataTable");
                dTable = dbService.FillDataTable(CommonVar.DBConName.UserDB, "[RD].[usp_SOMNT24GetAllData]", spParametersList);
                
                //Count Data
                DataTable tempDt = new DataTable("DataTable");
                ParameterSet param1 = new ParameterSet();
                var spParametersList1 = new List<SPParameter>();
                param1.SetSPParameterList(spParametersList1, "BusinessUnit", selected.BusinessUnit.ToString(), "");
                param1.SetSPParameterList(spParametersList1, "ReturnType", selected.RetnType, "");
                param1.SetSPParameterList(spParametersList1, "Description", selected.Description, "");
                param1.SetSPParameterList(spParametersList1, "ModuleCode", selected.ModuleCode, "");
                param1.SetSPParameterList(spParametersList1, "ModuleCodeDesc", selected.ModuleCodeDesc, "");
                if (selected.Status)
                {
                    param1.SetSPParameterList(spParametersList1, "Status", 1, "");
                }
                param1.SetSPParameterList(spParametersList1, "ExecutionType", '3', "");
                tempDt = dbService.FillDataTable(CommonVar.DBConName.UserDB, "[RD].[usp_SOMNT24GetAllData]", spParametersList1);

                if (tempDt.Rows.Count > 0)
                {
                    if (tempDt.Rows[0]["TotalRows"] != DBNull.Value)
                    {
                        rowCount = int.Parse(tempDt.Rows[0]["TotalRows"].ToString());
                    }
                }
            }
            catch (Exception e)
            {
                msg = MessageCreate.CreateErrorMessage(0, e, "GetGridData", "XONT.VENTURA.SOMNT24.dll");
              
            }
            finally {
                dbService.CloseService();
            }
            return dTable;
        }

        //ExecutionType = 1
        public DataTable GetModulePromptData(string businessUnit, ref MessageSet msg) {
            try
            {
                dbService.StartService();
                ParameterSet param = new ParameterSet();
                var spParametersList = new List<SPParameter>();
                param.SetSPParameterList(spParametersList, "BusinessUnit", businessUnit,"");
                param.SetSPParameterList(spParametersList, "ExecutionType", '1', "");
                dTable = new DataTable("DataTable");
                dTable = dbService.FillDataTable(CommonVar.DBConName.UserDB, "[RD].[usp_SOMNT24GetAllData]", spParametersList);
             }
            catch(Exception e)
            {
                msg = MessageCreate.CreateErrorMessage(0,e, "GetModulePromptData", "XONT.VENTURA.SOMNT24.DLL");
            }
            finally {
                dbService.CloseService();
            }
            return dTable;
        }

        //ExecutionType = 4
        public DataTable GetModulePromptDataForNew(string businessUnit, ref MessageSet msg)
        {
            try
            {
                dbService.StartService();
                ParameterSet param = new ParameterSet();
                var spParametersList = new List<SPParameter>();
                param.SetSPParameterList(spParametersList, "BusinessUnit", businessUnit, "");
                param.SetSPParameterList(spParametersList, "ExecutionType", '4', "");
                dTable = new DataTable("DataTable");
                dTable = dbService.FillDataTable(CommonVar.DBConName.UserDB, "[RD].[usp_SOMNT24GetAllData]", spParametersList);
            }
            catch (Exception e)
            {
                msg = MessageCreate.CreateErrorMessage(0, e, "GetModulePromptDataForNew", "XONT.VENTURA.SOMNT24.DLL");
            }
            finally
            {
                dbService.CloseService();
            }
            return dTable;
        }

        //ExecutionType = 5
        public DataTable GetCategoryPromptData(string businessUnit, ref MessageSet msg)
        {
            try
            {
                dbService.StartService();
                ParameterSet param = new ParameterSet();
                var spParametersList = new List<SPParameter>();
                param.SetSPParameterList(spParametersList, "BusinessUnit", businessUnit, "");
                param.SetSPParameterList(spParametersList, "ExecutionType", '5', "");
                dTable = new DataTable("DataTable");
                dTable = dbService.FillDataTable(CommonVar.DBConName.UserDB, "[RD].[usp_SOMNT24GetAllData]", spParametersList);
            }
            catch (Exception e)
            {
                msg = MessageCreate.CreateErrorMessage(0, e, "GetCategoryPromptData", "XONT.VENTURA.SOMNT24.DLL");
            }
            finally
            {
                dbService.CloseService();
            }
            return dTable;
        }
    }
    }

   