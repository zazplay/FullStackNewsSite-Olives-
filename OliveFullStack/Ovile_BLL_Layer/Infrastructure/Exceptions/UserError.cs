
namespace Ovile_BLL_Layer.Infrastructure.Exceptions
{
    /// <summary>
    /// Пользователь не существет
    /// </summary>
    public class UserError : Exception
    {
        public UserError()
        : base($"Uncorrect login or password")
        { }
    }
}
