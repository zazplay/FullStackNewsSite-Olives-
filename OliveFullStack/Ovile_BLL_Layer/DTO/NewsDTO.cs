using System;

namespace Ovile_BLL_Layer.DTO
{
    public class NewsDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImgSrc { get; set; }
        public string Source { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid? CategoryId { get; set; }
        public string? CategoryName { get; set; } 
    }
}
