using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using Microsoft.Extensions.Logging;
using OpenQA.Selenium;
using Xunit;

namespace Afina.Tui.Library
{
	public class AnexUnderTest : PageUnderTest
	{
		#region settings
		private const string SearchFormPath = @"//div[@id='freight_monitor']";
		private const string ResultsTablePath = SearchFormPath + @"//div[contains(@class,'resultset')]//table[contains(@class,'res')][1]";
		private const string FollowingPath = "/following-sibling::div";
		private const string ElementDropDown = "//a[@class='chosen-single']";
		private const string ElementUl = "//ul[@class='chosen-results']";
		private const string SearchPattern = @"//li[contains(text(),'{0}')]";

		private const string InputDepartureCitySearchPath = SearchFormPath + "//select[@name='SOURCE']";
		private const string InputDepartureCityDropDownPath = InputDepartureCitySearchPath + FollowingPath;//+ ElementDropDown;
		private const string InputDepartureCityPath = InputDepartureCitySearchPath + FollowingPath + ElementUl;

		private const string InputDestinationCitySearchPath = SearchFormPath + "//select[@name='TARGET']";
		private const string InputDestinationCityDropDownPath = InputDestinationCitySearchPath + FollowingPath + ElementDropDown;
		private const string InputDestinationCityPath = InputDestinationCitySearchPath + FollowingPath + ElementUl;

		private const string InputAirCompanySearchPath = SearchFormPath + "//select[@name='AIRLINE']";
		private const string InputAirCompanyDropDownPath = InputAirCompanySearchPath + FollowingPath + ElementDropDown;
		private const string InputAirCompanyPath = InputAirCompanySearchPath + FollowingPath + ElementUl;

		private const string InputDayRangePath = SearchFormPath + "//input[@name='PLUS_MINUS']";

		private const string InputDepartureDateFromPath = SearchFormPath + "//input[@name='CHECKIN']";
		private const string DateIconsPath = SearchFormPath + "//button[contains(@class,'Zebra_DatePicker_Icon')]";
		private const string InputDepartureDateToPath = SearchFormPath + "//input[@name='CHECKOUT']";

		private const string ButtonSearchPath = SearchFormPath + "//td[contains(@class,'freight_btn')]//button[@class ='load']";
		//private const string OneWayFlightsPath = SearchFormPath + "//table[@class='res']";

		private readonly List<string> DepartureCityExclude = new List<string>
		{
			"Выберите город отправления...",
			"Без Перелёта - Все",
			"Махачкала - УЙТАШ",
			"Махачкала - Махачкала (Уйташ)",
			"Москва - ШЕРЕМЕТЬЕВО-F",
			"Москва - ДОМОДЕДОВОF",
			"Москва - МОСКВА",
			"Москва - ШЕРЕМЕТЬЕВО-D",
			"Москва - ВНУКОВО-A",
			"Ростов-На-Дону - Платов",
			"Ростов-На-Дону - Ростов на Дону",
			"Санкт-Петербург - ПУЛКОВО-1",
			"Санкт-Петербург - ПУЛКОВО",
			"Ульяновск - ВОСТОЧНЫЙ",
			"Ульяновск - Баратаевка"
		};

		private readonly List<string> DestCityExclude = new List<string>
			{ "----" ,

			"Анталья - Все",
			"Дубай - Все",
			"Денпасар - Все",
			"Барселона - Все",
		};
		private readonly List<string> AirCompExclude = new List<string>() { "----" };
		#endregion

		#region controls

		//public SelectElement DepartureCitySearchElm { get; private set; }
		public IWebElement DepartureCityElm { get; private set; }
		public IWebElement DepartureCityDropDownElm { get; private set; }

		public IWebElement DestinationCityElm { get; private set; }
		public IWebElement DestinationCityDropDownElm { get; private set; }

		public IWebElement AirCompanyElm { get; private set; }
		public IWebElement AirCompanyDropDownElm { get; private set; }
		public IWebElement DepartureDateFromElm { get; private set; }
		public IWebElement DepartureDateToElm { get; private set; }
		public IWebElement DayRangeElm { get; private set; }
		public IWebElement SearchButtonElm { get; private set; }
		public static IEnumerable<IataCity> IataCities { get; }

		#endregion

		public AnexUnderTest()
		{
			Url = "https://b2b.anextour.com/flights";
			Name = "Anex";
			DatesRange = 185;
			OperatorId = 2;
			FlightsList = new List<Flight>();
		}

		[Fact]
		public void TestAnexPage()
		{
			var step = 0;
			TestInternal(step);
			Assert.Equal(1, 1);
		}

		public override void TestInternal(int step)
		{
			_driver.Navigate().GoToUrl(Url);
			Thread.Sleep(8000);

			_driver.SwitchTo().Frame(0);
			InitControls();
			InitDatesControls();
			SetDates();

			var cities = CollectAllOptions(InputDepartureCitySearchPath, DepartureCityExclude);

			foreach (var city in cities.Skip(step * 2).Take(2))
			//foreach (var city in cities)
			{
				CollectDestinationCities(city);
				InitControls();
			}
		}

		private void InitDatesControls()
		{
			DepartureDateFromElm = _driver.FindElement(By.XPath(InputDepartureDateFromPath));

			DepartureDateToElm = _driver.FindElement(By.XPath(InputDepartureDateToPath));
			DayRangeElm = _driver.FindElement(By.XPath(InputDayRangePath));
		}

		private void InitControls()
		{
			DepartureCityElm = _driver.FindElement(By.XPath(InputDepartureCityPath));
			DepartureCityDropDownElm = _driver.FindElement(By.XPath(InputDepartureCityDropDownPath));
			DestinationCityElm = _driver.FindElement(By.XPath(InputDestinationCityPath));
			DestinationCityDropDownElm = _driver.FindElement(By.XPath(InputDestinationCityDropDownPath));
			AirCompanyElm = _driver.FindElement(By.XPath(InputAirCompanyPath));
			AirCompanyDropDownElm = _driver.FindElement(By.XPath(InputAirCompanyDropDownPath));

			SearchButtonElm = _driver.FindElement(By.XPath(ButtonSearchPath));
		}


		private void SetDates()
		{
			Thread.Sleep(1900);
			DepartureDateFromElm.Clear();
			Thread.Sleep(1900);
			DepartureDateToElm.Clear();

			DepartureDateFromElm.Click();
			DepartureDateFromElm.SendKeys(Keys.Enter);
			Thread.Sleep(1900);
			//	DateTime.TryParseExact("04.11.2019", "dd.MM.yyyy", null, System.Globalization.DateTimeStyles.None, out var startDate);
			var startDate = DateTime.Now;
			var localDepartureDate = startDate.ToString("ddMMyyyy");
			var localDepartureEndDate = startDate.AddMonths(8).ToString("ddMMyyyy");

			localDepartureDate.ToList().ForEach(lettter =>
			{
				DepartureDateFromElm.SendKeys(lettter.ToString());
				Thread.Sleep(300);
			});

			DepartureDateToElm.SendKeys(Keys.Enter);
			Thread.Sleep(1400);
			localDepartureEndDate.ToList().ForEach(lettter =>
			{
				DepartureDateToElm.SendKeys(lettter.ToString());
				Thread.Sleep(400);
			});

			Thread.Sleep(1400);
			DatesSet = true;
		}

		private void CollectDestinationCities(string departureCity)
		{
			DepartureCityDropDownElm.Click();

			var by = string.Format(SearchPattern, departureCity);
			DepartureCityElm.FindElement(By.XPath(by)).Click();
			Thread.Sleep(2900);

			var destinationCities = CollectAllOptions(InputDestinationCitySearchPath, DestCityExclude);

			foreach (var destinationCity in destinationCities)
			{
				CollectAirCompanies(destinationCity, departureCity);
				InitControls();
				InitDatesControls();
				SetDates();
			}
		}

		private void CollectAirCompanies(string destinationCity, string departureCity)
		{
			for (int i = 0; i < 3; i++)
			{
				try
				{
					Screenshot screen = ((ITakesScreenshot)_driver).GetScreenshot();
					screen.SaveAsFile($"AnexOk_{i}_departureCity_{departureCity}_destinationCity_{destinationCity}_{DateTime.Now.ToString("yyyy.MM.dd.HH.m")}.png", ScreenshotImageFormat.Png);
					DestinationCityDropDownElm.Click();
					Thread.Sleep(5000 * (i + 1));
					var by = string.Format(SearchPattern, destinationCity);
					//DestinationCityElm.FindElement(By.XPath(by)).Click();
					_driver.FindElement(By.XPath(InputDestinationCityPath + by)).Click();

					break;
				}
				catch (ElementClickInterceptedException ex)
				{
					Screenshot screen = ((ITakesScreenshot)_driver).GetScreenshot();
					screen.SaveAsFile($"AnexClickError_{i}_{DateTime.Now.ToString("yyyy.MM.dd.HH.m")}.png", ScreenshotImageFormat.Png);

					Debug.WriteLine(ex.ToString());
					Debug.WriteLine($"departureCity {departureCity} destination city {destinationCity} ");
				}
				catch (Exception ex)
				{
					Screenshot screen = ((ITakesScreenshot)_driver).GetScreenshot();
					screen.SaveAsFile($"AnexError_{i}_{DateTime.Now.ToString("yyyy.MM.dd.HH.m")}.png", ScreenshotImageFormat.Png);

					_logger?.LogError(ex, "");
				}
			}
			var airCompannies = CollectAllOptions(InputAirCompanySearchPath, AirCompExclude);

			foreach (var airCompany in airCompannies)
			{
				FindFlights(airCompany, destinationCity, departureCity);
			}
		}


		private void FindFlights(string airCompany, string departureCity, string destinationCity)
		{
			//new Actions(_driver).MoveToElement(SearchButtonElm).MoveByOffset(0, 30).Click().Perform();
			AirCompanyDropDownElm.Click();

			var by = string.Format(SearchPattern, airCompany);
			Thread.Sleep(2200);
			AirCompanyElm.FindElement(By.XPath(by)).Click();
			Thread.Sleep(2200);

			SearchButtonElm.Click();
			Thread.Sleep(25500);

			var flights = _driver.FindElements(By.XPath(ResultsTablePath));
			if (flights.Any())
			{
				InitControls();
				FlightsList.AddRange(ParseFlights(departureCity, destinationCity, airCompany, flights.First()));
			}
		}

		private List<Flight> ParseFlights(string departureCity, string destinationCity, string airCompany, IWebElement webElement)
		{
			var list = new List<Flight>();
			var rows = webElement.FindElements(By.XPath("./tbody/tr"));

			for (var i = 0; i < rows.Count; i++)
			{
				try
				{
					webElement = _driver.FindElements(By.XPath(ResultsTablePath)).First();
					var rowArray = webElement.FindElements(By.XPath("./tbody/tr")).ToArray();
					var row = rowArray[i];
					var departureDateRaw = row.FindElement(By.XPath("./td[1]")).Text.Split(", ")[0];

					DateTime.TryParseExact(departureDateRaw, "dd.MM.yyyy", null, System.Globalization.DateTimeStyles.None, out var departureDate);
					var destinationDate = departureDate;
					var secondTd = row.FindElement(By.XPath("./td[2]"));
					var secondTdRows = secondTd.Text.Split("\r\n");
					if (secondTdRows[1].Contains("+1"))
					{
						destinationDate = destinationDate.AddDays(1);
					}
					var departures = secondTdRows[0].Split(" ");
					var departureTime = departures.First();
					var departureCityCode = departures.Last();
					var destinations = secondTdRows[1].Split(" ");
					var destinationTime = destinations.First();
					var destinationCityCode = destinations.Last().Replace(" +1", "");

					var flightNo = row.FindElement(By.XPath("./td[3]")).Text;
					var airCraft = row.FindElement(By.XPath("./td[4]")).Text.Split("\r\n").Last();
					var newFlight =
						new Flight
						{
							DepartureDate = departureDate,
							DepartureTime = departureTime,
							DepartureCity = departureCity,
							DepartureCityCode = departureCityCode,
							DepartureAirportCode = departureCityCode,
							DestinationDate = destinationDate,
							DestinationTime = destinationTime,
							DestinationAirportCode = destinationCityCode,
							OperatorName = Name,
							FlightNo = flightNo,
							FlightCompanyName = airCompany,
							AircraftKind = airCraft,
							OperatorId = OperatorId,
							CollectDate = DateTime.Now
						};
					list.Add(newFlight);
				}
				catch (Exception ex)
				{
					Screenshot screen = ((ITakesScreenshot)_driver).GetScreenshot();
					screen.SaveAsFile($"AnexError{DateTime.Now.ToString("yyyy.MM.dd.HH.m")}.png", ScreenshotImageFormat.Png);

					Debug.WriteLine(ex.ToString());
					_logger?.LogError(ex, "[Anex] ParseFlights");
				}
			}
			Thread.Sleep(1200);

			return list;
		}
	}
}
