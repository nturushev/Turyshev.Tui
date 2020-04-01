using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using Xunit;

namespace Afina.Tui.Library
{
	public class PegasUnderTest : PageUnderTest
	{
		#region settings
		private const string SearchFormPath = @"//form[contains(@class, 'flight-check-form')]";

		private const string ResultsTablePath = @"//div[contains(@class, 'flight-search-results')]";
		private const string InputDepartureCityPath = SearchFormPath + "//select[@name='departureCity']";

		private const string InputDepartureAirportPath = SearchFormPath + "//select[@name='departureAirport']";
		private const string AnyAiportValue = "Любой";

		private const string InputDestinationCountryPath = SearchFormPath + "//select[@name='destinationCountry']";

		private const string InputDestinationCityPath = SearchFormPath + "//select[@name='destinationCity']";

		private const string InputDepartureDateFromPath = SearchFormPath + "//input[@name='departureDateFrom']";
		private const string InputDepartureDateToPath = SearchFormPath + "//input[@name='departureDateTo']";

		private const string InputReturnDateFromPath = SearchFormPath + "//input[@name='returnDateFrom']";
		private const string InputReturnDateToPath = SearchFormPath + "//input[@name='returnDateTo']";

		private const string InputDatePickerPath = @"//div[@id='ui-datepicker-div']";
		private const string InputAvailableDatePath = InputDatePickerPath + "//td[.//a[@class='ui-state-default']]";

		private const string ButtonSearchPath = SearchFormPath + "/a[contains(@class,'flights-filter-ok')]";

		private const string OneWayFlightsPath = ResultsTablePath + "//div[@class='flight-vertical-container' and div[span[text()='Туда']]]";

		private readonly List<string> DepartureCityExclude = new List<string> { "Выберите город отправления..." };
		private readonly List<string> DestCountryExclude = new List<string> { "Выберите страну..." };
		private readonly List<string> DestCityExclude = new List<string> { "Выберите город прибытия..." };
		private List<string> RealCitiesAttended;
		#endregion

		#region controls

		public SelectElement DepartureCityElm { get; private set; }
		public SelectElement DepartureAirportElm { get; private set; }
		public SelectElement DestinationCountryElm { get; private set; }
		public SelectElement DestinationCityElm { get; private set; }
		public IWebElement DepartureDateFromElm { get; private set; }
		public IWebElement DepartureDateToElm { get; private set; }
		public IWebElement ReturnDateFromElm { get; private set; }
		public IWebElement ReturnDateToElm { get; private set; }
		public IWebElement SearchButtonElm { get; private set; }
		public static IEnumerable<IataCity> IataCities { get; }

		#endregion

		static PegasUnderTest()
		{
			var raw = File.ReadAllText("iataCodes.json");
			IataCities = JsonConvert.DeserializeObject<IEnumerable<IataCity>>(raw);
		}

		public PegasUnderTest()
		{
			Url = "https://pegast.ru/agency/pegasys/flights";
			Name = "Pegas";
			OperatorId = 1;
			DatesRange = 60;

			FlightsList = new List<Flight>();
		}

		public override IEnumerable<Flight> Collect(ILogger logger, int step)
		{
			_logger = logger;
			TestInternal(step);
			return FlightsList;
		}

		[Fact]
		public void TestPegasPage()
		{
			var step = 0;
			TestInternal(step);
			Assert.Equal(1, 1);
		}

		public override void TestInternal(int step)
		{
			_driver.Navigate().GoToUrl(Url);
			InitControls();

			var cities = CollectAllOptions(InputDepartureCityPath, DepartureCityExclude);

			foreach (var city in cities.Skip(step * 2).Take(2))
			//foreach (var city in cities.Where(e=> e =="Москва"))
			{
				_logger?.LogWarning($"[Pegas] Город вылета {city}. Начало");
				RealCitiesAttended = new List<string>();
				CollectDepartureCitiesFlights(city);
				_logger?.LogWarning($"[Pegas] Город вылета {city}. Окончание");
				InitControls();
			}
		}

		private void CollectDepartureCitiesFlights(string city)
		{
			//set departure city 
			DepartureCityElm.SelectByText(city);
			Thread.Sleep(3500);

			//collect all arrival countries
			var destinationCountries = CollectAllOptions(InputDestinationCountryPath, DestCountryExclude);


			foreach (var destinationCountry in destinationCountries)
			{
				_logger?.LogWarning($"[Pegas] Город вылета {city}. Страна прилёта {destinationCountry}. Начало");
				CollectArrivalCitiesFlights(city, destinationCountry);
				_logger?.LogWarning($"[Pegas] Город вылета {city}. Страна прилёта {destinationCountry}. Окончание");

			}
		}

		private void CollectArrivalCitiesFlights(string departureCity, string destinationCountry)
		{
			//set destination country 
			DestinationCountryElm.SelectByText(destinationCountry);
			Thread.Sleep(2500);

			//collect all arrival cities
			var destinationCities = CollectAllOptions(InputDestinationCityPath, DestCityExclude);
			_logger?.LogWarning($"[Pegas] Город вылета {departureCity}. Страна прилёта {destinationCountry}. Найдено городов вылета {destinationCities.Count()}");
			foreach (var destinationCity in destinationCities)
			{
				if (!RealCitiesAttended.Contains(destinationCity))
				{
					_logger?.LogWarning($"[Pegas] Город вылета {departureCity}. " +
						$"Страна прилёта {destinationCountry}. Город прилёта {destinationCity}. " +
						$"Начало");
					FindFlights(departureCity, destinationCountry, destinationCity);
					RealCitiesAttended.Add(destinationCity);
					_logger?.LogWarning($"[Pegas] Город вылета {departureCity}. " +
						$"Страна прилёта {destinationCountry}. Город прилёта {destinationCity}. " +
						$"Окончание");
				}
			}
		}

		private void FindFlights(string departureCity, string destinationCountry, string destinationCity)
		{
			//set destination City 
			DestinationCityElm.SelectByText(destinationCity);
			if (!DatesSet)
				SetDates();

			try
			{
				Screenshot screen = ((ITakesScreenshot)_driver).GetScreenshot();
				screen.SaveAsFile($"PegasBeforeSearch{DateTime.Now.ToString("yyyy.MM.dd.HH.m")}.png", ScreenshotImageFormat.Png);

				SearchButtonElm.Click();
				Thread.Sleep(5000);
			}
			catch (ElementClickInterceptedException ex)
			{
				_logger?.LogError(ex, $"departureCity {departureCity} destination {destinationCity}");
				ReloadAndRestorePage(departureCity, destinationCountry, destinationCity);
			}
			Thread.Sleep(5000);

			var flightTables = _driver.FindElements(By.XPath(OneWayFlightsPath));
			if (flightTables.Any())
			{
				var departureCityCode = IataCities.FirstOrDefault(icity => icity.Name == departureCity)?.Code;
				var destinationCityCode = IataCities.FirstOrDefault(icity => icity.Name == destinationCity)?.Code;
				if (departureCityCode == null)
					Debug.WriteLine(departureCityCode);
				if (destinationCityCode == null)
					Debug.WriteLine(destinationCityCode);
				FlightsList.AddRange(ParseFlights(departureCity, departureCityCode, destinationCountry, destinationCity, flightTables.First()));
			}
			else
			{
				_logger?.LogWarning($"[Pegas] Город вылета {departureCity}. " +
					$"Страна прилёта {destinationCountry}. Город прилёта {destinationCity}. " +
					$"Нет рейсов");
			}
		}

		private void ReloadAndRestorePage(string departureCity, string destinationCountry, string destinationCity)
		{
			_driver.Navigate().GoToUrl(Url);
			InitControls();
			Thread.Sleep(1000);
			DepartureCityElm.SelectByText(departureCity);
			Thread.Sleep(1000);
			DestinationCountryElm.SelectByText(destinationCountry);
			Thread.Sleep(1000);
			DestinationCityElm.SelectByText(destinationCity);
			Thread.Sleep(1000);
			SetDates();
		}

		private List<Flight> ParseFlights(string departureCity, string departureCityCode, string destinationCountry, string destinationCity, IWebElement flightTable)
		{
			var list = new List<Flight>();
			var rows = flightTable.FindElements(By.XPath("./div[@class='day-wrapper']"));
			try
			{
				_logger?.LogInformation($"[Pegas] departure city {departureCity} destinationCity {destinationCity}");
				_logger?.LogWarning($"[Pegas] Город вылета {departureCity}. " +
					$"Страна прилёта {destinationCountry}. Город прилёта {destinationCity}. " +
					$"Найдено рейсов: {rows.Count}");
				foreach (var row in rows)
				{
					var departureDateRaw = row.FindElement(By.XPath("./div[@class='day-header']/span")).Text.Split(" ")[0];

					var departureDate = DateTime.Parse(departureDateRaw);
					var destinationDate = departureDate;
					var flights = row.FindElements(By.XPath("./div[@class='data']//div[contains(@class,'f-row')]"));
					foreach (var flight in flights)
					{
						var flightNo = flight.FindElement(By.XPath(@"./div[@class='flight']")).Text;
						_logger?.LogInformation($"[Pegas] departure city {departureCity} destinationCity {destinationCity} flightNo {flightNo}");

						string[] departureAirInfo = flight.FindElement(By.XPath(@"./div[@class='avia']")).Text.Replace("\"", string.Empty).Split("\r\n");
						var airCompany = string.Empty;
						var aircraft = string.Empty;
						if (departureAirInfo != null && departureAirInfo.Any())
						{
							airCompany = departureAirInfo[0].Trim();
							if (departureAirInfo.Count() > 1)
							{
								aircraft = departureAirInfo[1].Trim();
							}
						}

						bool isConnecting = flight.GetAttribute("class").Contains("connector");

						string[] departureTimePlaceInfo = flight.FindElement(By.XPath(@"./div[@class='departure-item']")).Text.Replace("\"", string.Empty).Split("\r\n");

						var departureTime = departureTimePlaceInfo[0].Trim();
						var departureAirport = departureTimePlaceInfo[1].Trim();

						string[] returnTimePlaceInfo = flight.FindElement(By.XPath(@"./div[@class='return-item']")).Text.Replace("\"", string.Empty).Split("\r\n");

						try
						{
							// do debug better
							var plusDayElm = flight.FindElement(By.XPath(@"./span[@class='flight-date-diff']"));
							if (plusDayElm != null)
							{
								var dateDiff = plusDayElm.Text.Contains("+") ?
									 1 : -1;
								destinationDate = destinationDate.AddDays(dateDiff);
							}
						}
						catch (Exception ex)
						{
							Debug.WriteLine(ex.ToString());
						}

						var destinationTime = returnTimePlaceInfo[0].Trim();
						var destinationAirport = returnTimePlaceInfo[1].Trim();
						var newFlight =
						new Flight
						{
							DepartureDate = departureDate,
							DepartureTime = departureTime,
							DepartureCity = departureCity,
							DepartureCityCode = departureCityCode,
							DepartureAirportCode = departureAirport,
							DestinationDate = destinationDate, //Attention
							DestinationTime = destinationTime,
							DestinationCity = destinationCity,
							DestinationAirportCode = destinationAirport,
							OperatorName = Name,
							OperatorId = 1,
							FlightNo = flightNo,
							FlightCompanyName = airCompany,
							CollectDate = DateTime.Now,
							AircraftKind = aircraft,
							IsConnecting = isConnecting
						};
						list.Add(newFlight);
					}
				}
			}
			catch (Exception ex)
			{
				Debug.WriteLine(ex.ToString());
				_logger?.LogError(ex, "[Pegas] ParseFlights");
				throw;
			}
			return list;
		}


		private void InitControls()
		{
			DepartureCityElm = new SelectElement(_driver.FindElement(By.XPath(InputDepartureCityPath)));
			DepartureAirportElm = new SelectElement(_driver.FindElement(By.XPath(InputDepartureAirportPath)));
			DestinationCountryElm = new SelectElement(_driver.FindElement(By.XPath(InputDestinationCountryPath)));
			DestinationCityElm = new SelectElement(_driver.FindElement(By.XPath(InputDestinationCityPath)));
			DepartureDateFromElm = _driver.FindElement(By.XPath(InputDepartureDateFromPath));
			DepartureDateToElm = _driver.FindElement(By.XPath(InputDepartureDateToPath));

			ReturnDateFromElm = _driver.FindElement(By.XPath(InputReturnDateFromPath));
			ReturnDateToElm = _driver.FindElement(By.XPath(InputReturnDateToPath));

			SearchButtonElm = _driver.FindElement(By.XPath(ButtonSearchPath));
		}


		private void SetDates()
		{
			Thread.Sleep(1500);
			DepartureDateFromElm.Clear();
			Thread.Sleep(1500);
			DepartureDateToElm.Clear();
			Thread.Sleep(1500);
			ReturnDateFromElm.Clear();
			Thread.Sleep(1500);
			ReturnDateToElm.Clear();
			Thread.Sleep(1500);


			var localDepartureDate = DateTime.Now;
			//DateTime.ParseExact("01.11.2019", "dd.MM.yyyy", null, System.Globalization.DateTimeStyles.None);
			//var localDepartureEndDate = DateTime.Now.AddDays(DatesRange);
			var localDepartureEndDate = DateTime.Now.AddMonths(8);

			DepartureDateFromElm.Click();
			Thread.Sleep(1500);
			DepartureDateFromElm.SendKeys(localDepartureDate.ToShortDateString());
			Thread.Sleep(1500);
			DepartureDateToElm.SendKeys(localDepartureEndDate.ToShortDateString());
			Thread.Sleep(1500);

			DepartureDateToElm.Click();
			Thread.Sleep(1500);
			ReturnDateFromElm.SendKeys(localDepartureDate.ToShortDateString());
			Thread.Sleep(1500);
			ReturnDateToElm.SendKeys(localDepartureEndDate.ToShortDateString());
			Thread.Sleep(1500);
			DepartureDateFromElm.Click();
			DatesSet = true;
		}

	}
}
