using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Afina.Tui.Managers
{
	public class FileManager
	{
		public byte[] SaveFile(IEnumerable<Data.Flight> list, string listName)
		{
			byte[] bytes = new byte[0];

			using (ExcelPackage objExcelPackage = new ExcelPackage())
			{
				ExcelWorksheet objWorksheet = objExcelPackage.Workbook.Worksheets.Add(listName);

				var current = 1;

				// here will be title 
				current++;

				foreach (var flight in list)
				{
					objWorksheet.Cells[current, 1].Value = flight.DepartureDate.ToShortDateString();
					objWorksheet.Cells[current, 2].Value = flight.OperatorName;
					objWorksheet.Cells[current, 3].Value = flight.FlightNo;
					objWorksheet.Cells[current, 4].Value = flight.FlightCompanyName;
					objWorksheet.Cells[current, 5].Value = flight.DepartureCity;
					objWorksheet.Cells[current, 6].Value = flight.DepartureAirportCode;
					objWorksheet.Cells[current, 7].Value = flight.DepartureTime;
					objWorksheet.Cells[current, 8].Value = flight.DestinationAirportCodeWithConnecting;
					objWorksheet.Cells[current, 9].Value = flight.DestinationTime;
					objWorksheet.Cells[current, 10].Value = flight.AircraftKind;
					
					current++;
				}
				SetColumnWidth(objWorksheet);
				SetAutoFilterAndFIxHeader(objWorksheet);
				bytes = objExcelPackage.GetAsByteArray();
			}
			return bytes;
		}

		private void SetAutoFilterAndFIxHeader(ExcelWorksheet objWorksheet)
		{
			int rowIndex = 1;
			int startColumn = 1;
			int endColumn = 10;

			using (ExcelRange autoFilterCells = objWorksheet.Cells[
				rowIndex, startColumn,
				rowIndex, endColumn])
			{
				autoFilterCells.AutoFilter = true;
			}
			objWorksheet.View.FreezePanes(rowIndex+1, 1);  
		}

		private void SetColumnWidth(ExcelWorksheet objWorksheet)
		{
			objWorksheet.Column(1).Width = 10;
			objWorksheet.Column(2).Width = 10;
			objWorksheet.Column(3).Width = 10;
			objWorksheet.Column(4).Width = 15;
			objWorksheet.Column(5).Width = 10;
			objWorksheet.Column(6).Width = 10;
			objWorksheet.Column(7).Width = 10;
			objWorksheet.Column(8).Width = 10;
			objWorksheet.Column(9).Width = 10;
			objWorksheet.Column(10).Width = 15;
		}
	}
}
