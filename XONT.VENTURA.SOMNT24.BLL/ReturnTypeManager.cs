using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using XONT.Common.Message;

namespace XONT.VENTURA.SOMNT24
{
    public class ReturnTypeManager:IReturnTypeManager
    {
        private readonly ReturnTypeDAL  dal;
        private DataTable dTable;
        private ReturnType rtntype;

       public ReturnTypeManager()
        {
            dal = new ReturnTypeDAL();
        }
        
        //Check Exist Item is in Database
        public DataTable ExistTransactionBLL(string businessUnit,string ExistReturn, ref MessageSet message)
        {
            DataTable returntype = dal.ExistTransactionDAL(businessUnit, ExistReturn,ref message);
            return returntype;
        }

        //Select Return Type Item
        public ReturnType SeletedReturnType(string businessUnit, string moduleCode, string returnType,ref MessageSet message)
        {
            rtntype = dal.SeletedReturnType(businessUnit, moduleCode, returnType,ref message);
            return rtntype;
        }

        //Update Return Type
        public void UpdateReturnType(string businessUnit, string userName, string executionType, ReturnType rtnType, ref MessageSet _msg,ref string update)
        {
            dal.UpdateReturnType( businessUnit,  userName,  executionType,  rtnType, ref  _msg,ref update);
        }

        //Get Grid Data to List
        public DataTable GetGridData(Selection selected, out int rowCount, ref MessageSet msg)
        {
            dTable = dal.GetGridData(selected, out rowCount, ref msg);
            return dTable;
        }

        //Get GetModulePromptData for list 
        public DataTable GetModulePromptData(string businessUnit, ref MessageSet message) {
            dTable = dal.GetModulePromptData(businessUnit, ref message);
            return dTable;
        }
        //Get GetModulePromptData for New 
        public DataTable GetModulePromptDataForNew(string businessUnit, ref MessageSet message)
        {
            dTable = dal.GetModulePromptData(businessUnit, ref message);
            return dTable;
        }

        //Get Category Prompt Data
        public DataTable GetCategoryPromptData(string businessUnit, ref MessageSet message)
        {
            dTable = dal.GetCategoryPromptData(businessUnit, ref message);
            return dTable;
        }

    }
}
