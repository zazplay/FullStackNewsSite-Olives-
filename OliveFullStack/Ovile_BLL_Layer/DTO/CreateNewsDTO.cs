using System.ComponentModel.DataAnnotations;

namespace Ovile_BLL_Layer.DTO
{
    public class CreateNewsDTO
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }

        public string ImgSrc { get; set; }

        public string Source { get; set; }
    }
}
