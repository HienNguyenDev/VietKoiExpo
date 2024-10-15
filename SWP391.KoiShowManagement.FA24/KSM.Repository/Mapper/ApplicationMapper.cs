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
        }
    }
}
