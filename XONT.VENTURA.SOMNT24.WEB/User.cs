namespace XONT.VENTURA
{
    public class User
    {
        public string UserName { get; set; }
        public string BusinessUnit { get; set; }
        public string PowerUser { get; set; } = "0";
        public string UserLevelGroup { get; set; } = "USER";

        // Optional properties
        public string UserId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }

        public User()
        {
            PowerUser = "0";
            UserLevelGroup = "USER";
        }

        public User(string userName, string businessUnit)
        {
            UserName = userName;
            BusinessUnit = businessUnit;
            PowerUser = "0";
            UserLevelGroup = "USER";
        }
    }
}