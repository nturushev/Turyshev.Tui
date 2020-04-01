using Afina.Tui.Data;
using Afina.Tui.Managers;
using Afina.Tui.Models;
using Afina.Tui.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace Afina.Tui
{
	public class Startup
	{
		readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

		private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
		private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
			MapperConfig.Initialize();
		}


		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSingleton<IConfiguration>(Configuration);
			services.AddSingleton<IJwtFactory, JwtFactory>();
			services.AddAutoMapper();

			AddManagers(services);
			 
			services.AddDbContext<ApplicationDbContext>(options =>
				options.UseMySql(Configuration.GetConnectionString("MySQLConnection")));

			// jwt wire up
			// Get options from app settings
			var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

			// Configure JwtIssuerOptions
			services.Configure<JwtIssuerOptions>(options =>
			{
				options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
				options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
				options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
			});


			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = Configuration["JwtIssuerOptions:Issuer"],
						ValidAudience = Configuration["JwtIssuerOptions:Audience"],
						IssuerSigningKey = _signingKey
					};
				});

			services.AddAuthorization(options =>
			{
				options.AddPolicy(Const.Strings.JwtClaims.Policy, policy => policy.RequireClaim(Const.Strings.JwtClaimIdentifiers.Rol, Const.Strings.JwtClaims.ApiAccess));
			});

			services.AddIdentity<ApplicationUser, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationDbContext>()
				.AddDefaultTokenProviders();
			// In production, the Angular files will be served from this diwrectory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/dist";
			});
			services.AddCors(options =>
			{
				options.AddPolicy(MyAllowSpecificOrigins,
				builder =>
				{
					builder.WithOrigins("http://localhost",
										"http:/172.17.0.1",
										"http://pvm-pto-01");
				});
			});

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
		}
		private void AddManagers(IServiceCollection services)
		{
			services.AddScoped<FileManager, FileManager>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
				app.UseHsts();
			}

			//app.UseErrorHandlingMiddleware();

			var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

				ValidateAudience = true,
				ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

				ValidateIssuerSigningKey = true,
				IssuerSigningKey = _signingKey,

				RequireExpirationTime = false,
				ValidateLifetime = false,
				ClockSkew = TimeSpan.Zero
			};

			app.UseAuthentication();

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseCors(MyAllowSpecificOrigins);
			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = "ClientApp";
				//!!!spa.Options.DefaultPage = "";
				spa.Options.StartupTimeout = new TimeSpan(0, 0, 300);
				if (env.IsDevelopment())
				{
					//spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
					spa.UseAngularCliServer(npmScript: "start");
				}
			});
		}
	}
}
