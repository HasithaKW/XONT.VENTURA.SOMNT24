using System.Collections.Generic;
using System.Linq;

namespace XONT.Common.Message
{
    public class MessageSet
    {
        private readonly List<string> _errors = new List<string>();
        private readonly List<string> _warnings = new List<string>();
        private readonly List<string> _information = new List<string>();

        public IReadOnlyList<string> Errors => _errors;
        public IReadOnlyList<string> Warnings => _warnings;
        public IReadOnlyList<string> Information => _information;

        public bool HasErrors => _errors.Any();
        public bool HasWarnings => _warnings.Any();

        public void AddError(string message) => _errors.Add(message);
        public void AddWarning(string message) => _warnings.Add(message);
        public void AddInformation(string message) => _information.Add(message);

        public void Clear()
        {
            _errors.Clear();
            _warnings.Clear();
            _information.Clear();
        }
    }
}