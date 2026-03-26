using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using XONT.Common.Message;

namespace XONT.VENTURA.SOMNT24
{
    public interface  IReturnTypeManager
    {
        //Select Return Type Item 
        ReturnType SeletedReturnType(string businessUnit, string moduleCode,string returnType,ref MessageSet message);

        //Update Rerturn Type
        void UpdateReturnType(string businessUnit, string userName, string executionType, ReturnType rtnType, ref MessageSet _msg,ref string update);

        //List Data
        DataTable GetGridData(Selection selected, out int rowCount, ref MessageSet msg);

        //Check Exist Data in Database
        DataTable ExistTransactionBLL(string businessUnit, string ExistReturn, ref MessageSet message);

        //Get GetModulePromptData for list
        DataTable GetModulePromptData(string businessUnit, ref MessageSet message);

        //Get GetModulePromptData for New/NewBased/Edit 
        DataTable GetModulePromptDataForNew(string businessUnit, ref MessageSet message);

        //Get Category Prompt Data
        DataTable GetCategoryPromptData(string businessUnit, ref MessageSet msg);
    }
}
