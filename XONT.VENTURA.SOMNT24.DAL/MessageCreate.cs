using System;

namespace XONT.Common.Message
{
    public static class MessageCreate
    {
        // Existing method (if any)
        public static MessageSet CreateErrorMessage(int errorCode, Exception ex, string method, string source)
        {
            var msg = new MessageSet();
            msg.AddError($"Error in {method} ({source}): {ex.Message}");
            return msg;
        }

        // Add this method inside the class
        public static MessageSet CreateUserMessage(int code, string p1, string p2, string p3, string p4, string p5, string p6)
        {
            var msg = new MessageSet();

            string message = code switch
            {
                200011 => $"'{p1}' already exists.",
                200042 => "Update failed: record may have been modified by another user.",
                200045 => "An error occurred.",
                _ => $"User message {code} (params: {p1}, {p2}, {p3}, {p4}, {p5}, {p6})"
            };

            msg.AddInformation(message);
            return msg;
        }
    }
}