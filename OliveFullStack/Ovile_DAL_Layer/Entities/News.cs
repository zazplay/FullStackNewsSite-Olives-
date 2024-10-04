using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ovile_DAL_Layer.Entities
{
    public class News
    {
        public Guid Id { get; set; }

        public string Title {  get; set; }

        public string Description { get; set; }

        public string ImgSrc { get; set; }

        public string Source { get; set; }

        public DateTime CreatedAt { get; set; }

        public Guid? CategoryId { get; set; }

        public Category? Category { get; set; }  
    }
}