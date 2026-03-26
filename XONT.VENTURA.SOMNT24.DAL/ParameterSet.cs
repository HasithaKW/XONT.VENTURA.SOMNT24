// ParameterSet.cs
using System.Collections.Generic;

namespace XONT.Common.Data
{
    public class ParameterSet
    {
        public void SetSPParameterList(List<SPParameter> list, string name, object value, string comment = "")
        {
            list.Add(new SPParameter { Name = name, Value = value });
        }
    }
}