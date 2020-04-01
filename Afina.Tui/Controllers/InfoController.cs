using System;
using System.Linq;
using Afina.Tui.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Afina.Tui.Library;
using Afina.Tui.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Mime;
using Afina.Tui.Managers;
using Microsoft.Extensions.Logging;
using System.Threading;
using Afina.Tui.Models;
using Microsoft.Extensions.Caching.Memory;

namespace Afina.Tui.Controllers
{
	//[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = Const.Strings.JwtClaims.Policy)]
	[Route("api/[controller]")]
	public class InfoController : Controller
	{
		private readonly ApplicationDbContext _context;
		private readonly FileManager _filemanager;
		private readonly ILogger<InfoController> _logger;
		private readonly IMemoryCache _cache;

		public InfoController(ApplicationDbContext context, FileManager fileManager, ILogger<InfoController> logger, IMemoryCache memoryCache)
		{
			_context = context;
			_filemanager = fileManager;
			_logger = logger;
			_cache = memoryCache;
		}

		[HttpPost("flights")]
		public IActionResult Flights([FromBody]FilterSettings settings)
		{
			var flights = GetFlightsInternal(settings);
			return new OkObjectResult(value: new { flights });
		}

		[HttpPost("saveFlights")]
		public ActionResult Save([FromBody]FilterSettings settings, string fileName = "Отчёт")
		{
			var flights = GetFlightsInternal(settings);
			var bytes = _filemanager.SaveFile(flights, fileName);
			return File(bytes, MediaTypeNames.Application.Octet,
				//$"Отчет c {settings.DateFrom} по {settings.DateTo}.xlsx");
				$"Отчет c  .xlsx");
		}

		[HttpPost("collect")]
		public async Task<IActionResult> Collect(int i = 0)
		{
			for (var j = 0; j < 36; j++)
			{
				Thread.Sleep(10000);
				try
				{
					IEnumerable<Library.Flight> flights;
					using (var page = new PegasUnderTest())
					//using (var page = new AnexUnderTest())
					{
						_logger?.LogWarning($"[Pegas] Серия {j}");
						flights = page.Collect(_logger, j)?.ToList();
					}
					var flightsDto =
						flights.Select(flight => new Data.Flight(flight));

					await _context.AddRangeAsync(flightsDto);
					await _context.SaveChangesAsync();
					_logger.LogInformation($"{j} ok flights amount {flights.Count()}");

				}
				catch (Exception ex)
				{
					_logger.LogInformation($"{j} troubles");
					_logger.LogError($"{j}", ex);
					return BadRequest(ex.ToString());
				}
				//Thread.Sleep(120000);
				Thread.Sleep(10000);
			}
			return Ok();
		}


		[HttpGet("dictionaries")]

		public IActionResult GetDictionaries()
		{
			object cacheEntry;
			var cachKey = "Dictionaries";

			// Look for cache key.
			if (!_cache.TryGetValue(cachKey, out cacheEntry))
			{
				cacheEntry = GetDictionariesFromDB();

				// Set cache options.
				var cacheEntryOptions = new MemoryCacheEntryOptions()
					// Keep in cache for this time, reset time if accessed.
					.SetSlidingExpiration(TimeSpan.FromDays(1));

				// Save data in cache.
				_cache.Set(cachKey, cacheEntry, cacheEntryOptions);
			}

			return Ok(cacheEntry);
		}

		private object GetDictionariesFromDB()
		{ 
			var operators = new List<Operator>();
			operators.Add(new Operator { OperatorId = 0, Name = "---" });
			operators.AddRange(_context.Operator.ToList());

			var airCompanies = _context.AirCompany.Select(item => new { item.OperatorID, item.Name }).OrderBy(item => item).ToList();
			var departureAirports = _context.DepartureAirport.Select(item => new { item.OperatorID, item.Name }).OrderBy(item => item).ToList();
			var destinationAirports = _context.DestinationAirport.Select(item => new { item.OperatorID, item.Name }).OrderBy(item => item).ToList();

			 return new { operators, airCompanies, departureAirports, destinationAirports };
		}


		[HttpPost("clean")]
		public async Task<IActionResult> Clean(string secret)
		{
			if (string.IsNullOrWhiteSpace(secret) ||
				secret.Equals(GetSecret(), StringComparison.InvariantCulture))
				return BadRequest();
			try
			{
				var allFlights = _context.Flight.ToList();
				var uniqueFlights = new List<Data.Flight>();
				Data.Flight currentFlight;
				foreach (var flight in allFlights)
				{
					currentFlight =
							uniqueFlights.FirstOrDefault(currentF => currentF.DepartureDate == flight.DepartureDate
					&& currentF.DepartureTime == flight.DepartureTime
					&& currentF.DestinationDate == flight.DestinationDate
					&& currentF.DestinationTime == flight.DestinationTime
					&& currentF.OperatorName == flight.OperatorName
					&& currentF.FlightNo == flight.FlightNo
					&& currentF.FlightCompanyName == flight.FlightCompanyName
					&& currentF.DepartureCityCode == flight.DepartureCityCode
					&& currentF.DepartureAirportCode == flight.DepartureAirportCode
					&& currentF.DestinationAirportCode == flight.DestinationAirportCode
					&& currentF.IsConnecting == flight.IsConnecting
					&& currentF.AircraftKind == flight.AircraftKind);
					if (currentFlight != null)
						continue;
					uniqueFlights.Add(currentFlight);
				}
				_context.RemoveRange(allFlights);
				await _context.AddRangeAsync(uniqueFlights);
				await _context.SaveChangesAsync();
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.ToString());
			}
		}

		private static string GetSecret()
		{
			return $"{DateTime.Now.Day.ToString("00")}-{DateTime.Now.Year.ToString()}";
		}


		private IEnumerable<Data.Flight> GetFlightsInternal(FilterSettings settings)
		{
			var departureDateFrom = DateTime.Parse(settings.DateFrom);
			var departureDateTo = DateTime.Parse(settings.DateTo);
			var flights = _context.Flight
				.Where(t =>
					t.DepartureDate >= departureDateFrom && t.DepartureDate <= departureDateTo);
			if (settings.OperatorId > 0)
			{
				flights = flights.Where(flight => flight.OperatorId == settings.OperatorId);
			}
			if (!string.IsNullOrWhiteSpace(settings.FlightNo))
			{
				settings.FlightNo = settings.FlightNo.Trim().ToLower();
				flights = flights.Where(flight => !string.IsNullOrWhiteSpace(flight.FlightNo) && flight.FlightNo.ToLower().Contains(settings.FlightNo));
			}
			if (settings.AirCompanies != null && settings.AirCompanies.Any())
			{
				flights = flights.Where(flight => !string.IsNullOrWhiteSpace(flight.FlightCompanyName) &&
				settings.AirCompanies.Contains(flight.FlightCompanyName.ToLower()));
			}
			if (!string.IsNullOrWhiteSpace(settings.DepartureCity))
			{
				settings.DepartureCity = settings.DepartureCity.Trim().ToLower();
				flights = flights.Where(flight => !string.IsNullOrWhiteSpace(flight.DepartureCity) && flight.DepartureCity.ToLower().Contains(settings.DepartureCity));
			}
			if (settings.DepartureAirports != null && settings.DepartureAirports.Any())
			{
				flights = flights.Where(flight => !string.IsNullOrWhiteSpace(flight.DepartureAirportCode)
				&& settings.DepartureAirports.Contains(flight.DepartureAirportCode.ToLower()));
			}

			if (settings.DestinationAirports != null && settings.DestinationAirports.Any())
			{
				flights = flights.Where(flight => !string.IsNullOrWhiteSpace(flight.DestinationAirportCode) && settings.DestinationAirports.Contains(flight.DestinationAirportCode.ToLower()));
			}
			if (!string.IsNullOrWhiteSpace(settings.AirCraftKind))
			{
				settings.AirCraftKind = settings.AirCraftKind.Trim().ToLower();
				flights = flights.Where(flight => !string.IsNullOrWhiteSpace(flight.AircraftKind) && flight.AircraftKind.ToLower().Contains(settings.AirCraftKind));
			}
			var list = flights.OrderBy(flight => flight.DepartureDate).ToList();
			return list;
		}
	}
}
