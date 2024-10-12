using KSM.Repository.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KSM.Repository.Repositories.Generic
{
    /// <summary>
    /// An abstract EF implementation of IGenericRepository.
    /// </summary>
    public abstract class GenericDbContextRepository<TContext, TEntity, TKey> : IGenericRepository<TEntity, TKey>
        where TContext : DbContext
        where TEntity : class, new()
        where TKey : IEquatable<TKey>
    {
        protected readonly TContext _context;
        protected DbSet<TEntity> DbSet { get; }

        // Constructor that takes TContext and initializes the DbSet
        public GenericDbContextRepository(TContext context)
        {
            _context = context;
            DbSet = context.Set<TEntity>();
        }

        /// <inheritdoc/>
        public TEntity Create(TEntity t)
        {
            var result = DbSet.Add(t);
            _context.SaveChanges();
            return result.Entity;
        }

        /// <inheritdoc/>
        public TEntity? GetByID(TKey id) => DbSet.Find(id);

        /// <inheritdoc/>
        public IEnumerable<TEntity> GetAll() => DbSet.ToList();

        /// <inheritdoc/>
        public async Task<IEnumerable<TEntity>> GetAllAsync() => await DbSet.ToListAsync(); // Make this async

        /// <inheritdoc/>
        public bool Update(TEntity t)
        {
            DbSet.Update(t);
            return _context.SaveChanges() > 0;
        }

        /// <inheritdoc/>
        public bool Delete(TEntity t)
        {
            DbSet.Remove(t);
            return _context.SaveChanges() > 0;
        }

        /// <inheritdoc/>
        public async ValueTask<TEntity> CreateAsync(TEntity t)
        {
            var result = await DbSet.AddAsync(t);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        /// <inheritdoc/>
        public async ValueTask<TEntity?> GetByIDAsync(TKey id) => await DbSet.FindAsync(id);

        /// <inheritdoc/>
        public async IAsyncEnumerable<TEntity> GetAllAsyncEnumerable()
        {
            await foreach (var entity in DbSet.AsAsyncEnumerable())
            {
                yield return entity;
            }
        }
        private async ValueTask<bool> SaveChangesAsync()
        {
            try
            {
                return await _context.SaveChangesAsync() > 0;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }
        /// <inheritdoc/>
        public async ValueTask<bool> UpdateAsync(TEntity t)
        {
            DbSet.Update(t);
            return await SaveChangesAsync();
        }

        /// <inheritdoc/>
        public async ValueTask<bool> DeleteAsync(TEntity t)
        {
            DbSet.Remove(t);
            return await SaveChangesAsync();
        }

        
    }
}
