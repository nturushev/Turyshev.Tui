using Afina.Tui.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Afina.Tui.Data
{
	public class ApplicationDbContext : IdentityDbContext
	{
		public ApplicationDbContext(DbContextOptions options) : base(options)
		{
		}

		public virtual DbSet<ApplicationUser> ApplicationUser { get; set; }
		public virtual DbSet<Operator> Operator { get; set; }
		public virtual DbSet<Flight> Flight { get; set; }
		public virtual DbSet<AirCompany> AirCompany { get; set; }
		public virtual DbSet<DepartureCity> DepartureCity { get; set; }
		public virtual DbSet<DepartureAirport> DepartureAirport { get; set; }
		public virtual DbSet<DestinationAirport> DestinationAirport { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
			// Customize the ASP.NET Identity model and override the defaults if needed.
			// For example, you can rename the ASP.NET Identity table names and more.
			// Add your customizations after calling base.OnModelCreating(builder);

			builder.Entity<AirCompany>(entity =>
			{
				entity.HasKey(e => e.AirCompanyId);
				entity.ToTable("v_aircompany");
			});
			builder.Entity<DepartureAirport>(entity =>
			{
				entity.HasKey(e => e.DepartureAirportId);
				entity.ToTable("v_departureAirport");
			});
			builder.Entity<DepartureCity>(entity =>
			{
				entity.HasKey(e => e.DepartureCityId);
				entity.ToTable("v_departureCity");
			});

			builder.Entity<DestinationAirport>(entity =>
			{
				entity.HasKey(e => e.DestinationAirportId);
				entity.ToTable("v_destinationAirport");
			});

			builder.Entity<Operator>(entity =>
			{
				entity.HasKey(e => e.OperatorId);

				entity.ToTable("t_operator");

				entity.Property(e => e.OperatorId)
					.HasColumnName("OperatorID")
					.HasColumnType("int(11)");
				 
			});
			builder.Entity<Flight>(entity =>
			{
				entity.HasKey(e => e.FlightId);

				entity.ToTable("t_flight");

				entity.Property(e => e.FlightId)
					.HasColumnName("FlightID")
					.HasColumnType("int(11)");
				 
			});
		}
	}
}
