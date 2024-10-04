namespace Ovile_BLL_Layer.Infrastructure.Exceptions
{
    /// <summary>
    /// Новость не существует
    /// </summary>
    public class NewsDoesNotExist : Exception
    {
        public NewsDoesNotExist(string id)
        : base($"News with ID {id} does not exist.")
        { }
    }

}