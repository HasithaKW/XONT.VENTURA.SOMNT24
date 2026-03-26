using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace XONT.VENTURA.SOMNT24
{
    [Serializable()]
    [DataContract]
   public  class ReturnType
    {
        [DataMember]
        public string BusinessUnit { get; set; }
        [DataMember]
        public string ModuleCode { get; set; }
        [DataMember]
        public string ModuleCodeDesc { get; set; }
        [DataMember]
        public string RetnType { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string ReturnCategory { get; set; }
        [DataMember]
        public string ReturnCategoryDesc { get; set; }
        [DataMember]
        public string ProcessingRequired { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public byte[] TimeStamp { get; set; } //For Concurrency
        [DataMember]
        public string ReturnDeductionType { get; set; }
        [DataMember]
        public string ValidateReturnValue { get; set; }

    }
    
    public class Selection
    {
        [DataMember]
        public string BusinessUnit { get; set; }
        [DataMember]
        public string ModuleCode { get; set; }
        [DataMember]
        public string ModuleCodeDesc { get; set; }
        [DataMember]
        public string RetnType { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public bool StartWith { get; set; }
        [DataMember]
        public bool Status { get; set; }
        [DataMember]
        public int FirstRow { get; set; }
        [DataMember]
        public int LastRow { get; set; }

        public Selection()
        {
            BusinessUnit = "";
            ModuleCode = "";
            ModuleCodeDesc = "";
            RetnType = "";
            Description  = "";
            StartWith = true;
            Status = true;
            FirstRow = 0;
            LastRow = 0;
        }
    }

    public class StoreModifications
    {
        [DataMember]
        public string ModuleCode { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public bool Status { get; set; }
        [DataMember]
        public bool CollapsedState { get; set; }
        [DataMember]
        public string ReturnType { get; set; }
        [DataMember]
        public string ReturnTypeDesc { get; set; }
        [DataMember]
        public bool StartWith { get; set; }

    }
   
}
