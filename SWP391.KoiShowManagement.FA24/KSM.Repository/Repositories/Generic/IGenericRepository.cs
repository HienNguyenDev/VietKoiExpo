using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.Generic
{
    /// <summary>
    /// Generic interface for repositories.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <typeparam name="TKey">The type of the entity's key.</typeparam>
    public interface IGenericRepository<TEntity, TKey>
        where TEntity : class, new()
        where TKey : IEquatable<TKey>
    {
        TEntity Create(TEntity t);

        TEntity? GetByID(TKey id);

        IEnumerable<TEntity> GetAll();

        bool Update(TEntity t);

        bool Delete(TEntity t);

        ValueTask<TEntity> CreateAsync(TEntity t);

        ValueTask<TEntity?> GetByIDAsync(TKey id);

        Task<IEnumerable<TEntity>> GetAllAsync();

        ValueTask<bool> UpdateAsync(TEntity t);

        ValueTask<bool> DeleteAsync(TEntity t);

    }
}
