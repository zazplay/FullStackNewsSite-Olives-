namespace OliveFullStack.PresentationLayer.Models.Requests.NewsRequests
{
    public class UpdateNewsRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImgSrc { get; set; }
        public string Source { get; set; }
        public string CategoryId { get; set; }
    }
}
