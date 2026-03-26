using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace XONT.Common.Extensions
{
    public static class SessionExtensions
    {
        public static T GetObject<T>(this ISession session, string key)
        {
            var data = session.Get(key);
            if (data == null) return default(T);
            return JsonSerializer.Deserialize<T>(data);
        }

        public static void SetObject<T>(this ISession session, string key, T value)
        {
            var data = JsonSerializer.SerializeToUtf8Bytes(value);
            session.Set(key, data);
        }
    }
}