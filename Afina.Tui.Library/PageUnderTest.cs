using Microsoft.Extensions.Logging;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Afina.Tui.Library
{
	public class PageUnderTest : IPageUnderTest, IDisposable
	{
		protected readonly IWebDriver _driver;
		protected string Url { get; set; }
		protected string Name { get; set; }
		protected int OperatorId { get; set; }

 
		protected bool DatesSet { get; set; }

		protected int DatesRange { get; set; }
		protected ILogger _logger { get; set; }
		protected List<Flight> FlightsList { get; set; }

		protected const string OptionPath = "//option";

		//public PageUnderTest()
		//{
		//	ChromeOptions options = new ChromeOptions();
		//	//options.AddArgument("--user-data-dir=ChromeProfile");
		//	options.AddArgument(@"--user-data-dir=C:\code\Afina.Tui\Afina.Tui\ChromeProfile");
		
		//	DesiredCapabilities capabilities = new DesiredCapabilities { Platform = Platform.CurrentPlatform };
		//	capabilities?.SetCapability(CapabilityType.BrowserName, "chrome");
		//	//capabilities.SetCapability(ChromeOptions.Capability, options);
		//	_driver = new RemoteWebDriver(new Uri("http://localhost:4444/wd/hub"), capabilities);
		//}

		public PageUnderTest()
		{
			ChromeOptions options = new ChromeOptions();
			//options.AddArgument("--user-data-dir=ChromeProfile");
			options.AddArgument(@"--user-data-dir=C:\code\Afina.Tui\Afina.Tui\ChromeProfile");
			_driver = new ChromeDriver(options);
		}

		public virtual IEnumerable<Flight> Collect(ILogger logger, int step)
		{
			_logger = logger;
			TestInternal(step);
			return FlightsList;
		}

		public virtual void TestInternal(int step) { }

		protected IEnumerable<string> CollectAllOptions(string xpath, IEnumerable<string> excludableOptions)
		{
			var xpathOptions = xpath + OptionPath;
			var by = By.XPath(xpathOptions);
			var options = _driver.FindElements(by);
			var items = options.Select(option => option.GetAttribute("innerText"))
				.Where(text => !excludableOptions.Contains(text))
				.ToList();
			return items;
		}

		public void Dispose()
		{
			_driver?.Close();
			_driver?.Quit();
			_driver?.Dispose();
		}
	}
}
