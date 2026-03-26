// CommonVar.cs
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace XONT.Common.Data
{
    public static class CommonVar
    {
        public static class DBConName
        {
            public static string UserDB { get; } = LoadConnectionString("UserDB");

            private static string LoadConnectionString(string name)
            {
                // For a console/web app, the configuration is usually in appsettings.json.
                // We'll assume it's in the current directory or the startup project's output.
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json", optional: true)
                    .AddEnvironmentVariables();

                var config = builder.Build();
                return config.GetConnectionString(name) ?? throw new InvalidOperationException($"Connection string '{name}' not found.");
            }
        }
    }
}