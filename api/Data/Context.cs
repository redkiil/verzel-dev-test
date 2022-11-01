using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
            
        }
        public DbSet<Vehicle> vehicles { get; set; }
        public DbSet<User> users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.Property(e => e.Model).HasMaxLength(60).IsRequired();
                entity.Property(e => e.Brand).HasMaxLength(60).IsRequired();
                entity.Property(e => e.Color).HasMaxLength(60).IsRequired();
                entity.Property(e => e.Location).HasMaxLength(60).IsRequired();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Username).HasMaxLength(60).IsRequired();
                entity.Property(e => e.Password).HasMaxLength(120).IsRequired();
            });
        }
    }
}