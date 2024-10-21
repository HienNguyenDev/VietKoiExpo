using AutoMapper;
using KSM.Repository.Models;
using KSM.Repository.ModelsMapper;


namespace KSM.Repository.Mapper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<TblkoiFish, KoifishModel>().ReverseMap();
            CreateMap<Tblvariety, VarietyModel>().ReverseMap();
            CreateMap<Tblscore, ScoreModel>().ReverseMap();
            CreateMap<Tblcategory, CategoryModel>().ReverseMap();
            CreateMap<Tblnews, NewsModel>().ReverseMap();
            CreateMap<Tblcompetition, CompetitionModel>().ReverseMap();
            CreateMap<Tblregistration, RegistrationModel>().ReverseMap();
        }
    }
}
