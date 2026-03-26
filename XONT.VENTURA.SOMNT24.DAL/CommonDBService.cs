// CommonDBService.cs
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace XONT.Common.Data
{
    public class CommonDBService : IDisposable
    {
        private SqlConnection _connection;

        public void StartService()
        {
            _connection = new SqlConnection(CommonVar.DBConName.UserDB);
            _connection.Open();
        }

        public void CloseService()
        {
            _connection?.Close();
            _connection?.Dispose();
            _connection = null;
        }

        public DataTable FillDataTable(string connectionName, string commandText, List<SPParameter> parameters)
        {
            using (var cmd = new SqlCommand(commandText, _connection))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null)
                {
                    foreach (var p in parameters)
                    {
                        cmd.Parameters.AddWithValue(p.Name, p.Value ?? DBNull.Value);
                    }
                }

                var dt = new DataTable();
                using (var da = new SqlDataAdapter(cmd))
                {
                    da.Fill(dt);
                }
                return dt;
            }
        }

        public int ExcecuteWithReturn(string connectionName, string commandText, List<SPParameter> parameters)
        {
            using (var cmd = new SqlCommand(commandText, _connection))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                if (parameters != null)
                {
                    foreach (var p in parameters)
                    {
                        cmd.Parameters.AddWithValue(p.Name, p.Value ?? DBNull.Value);
                    }
                }
                return cmd.ExecuteNonQuery();
            }
        }

        public void Dispose()
        {
            CloseService();
        }
    }
}