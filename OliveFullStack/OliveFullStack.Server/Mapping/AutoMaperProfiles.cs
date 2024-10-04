using AutoMapper;
using Ovile_DAL_Layer.Entities;
using Ovile_BLL_Layer.DTO;
using OliveFullStack.PresentationLayer.Models.Responses;
using OliveFullStack.PresentationLayer.Models.Requests.NewsRequests;
using OliveFullStack.PresentationLayer.Models.Requests.CategoryRequests;

public class AutoMaperProfiles : Profile
{
    public AutoMaperProfiles()
    {
        CreateMap<News, NewsDTO>().ReverseMap();

        CreateMap<Category, CategoryDTO>().ReverseMap();

        CreateMap<AddNewsRequest, NewsDTO>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category))
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
