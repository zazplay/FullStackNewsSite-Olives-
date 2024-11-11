using AutoMapper;
using Ovile_DAL_Layer.Entities;
using Ovile_BLL_Layer.DTO;
using OliveFullStack.Server.Models.Requests.CategoryRequests;
using OliveFullStack.Server.Models.Requests.NewsRequests;
using OliveFullStack.Server.Models.Responses;

public class AutoMaperProfiles : Profile
{
    public AutoMaperProfiles()
    {
        // Маппинг из News в NewsDTO
        CreateMap<News, NewsDTO>()
            .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null));

        // Маппинг из NewsDTO в News
        CreateMap<NewsDTO, News>()
            .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.CategoryId))
            .ForMember(dest => dest.Category, opt => opt.Ignore()); // CategoryId не передаётся напрямую из DTO, поэтому игнорируем

        CreateMap<Category, CategoryDTO>().ReverseMap();

        CreateMap<AddNewsRequest, NewsDTO>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.CategoryId))
            .ForMember(dest => dest.CategoryId, opt => opt.Ignore());

        CreateMap<UpdateNewsRequest, NewsDTO>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.CategoryId)) 
            .ForMember(dest => dest.CategoryId, opt => opt.Ignore());

        CreateMap<NewsDTO, NewsResponse>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.CategoryName)); 

        CreateMap<CategoryDTO, CategoryResponse>().ReverseMap();
        CreateMap<AddCategoryRequest, CategoryDTO>();
        CreateMap<UpdateCategoryRequest, CategoryDTO>().ReverseMap();
    }
}
