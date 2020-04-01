using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Afina.Tui.Services
{
	public class ErrorHandlingMiddleware
	{
		private readonly RequestDelegate next;

		public ErrorHandlingMiddleware(RequestDelegate next )
		{
			this.next = next;
		}

		public async Task Invoke(HttpContext context, ILogger<ErrorHandlingMiddleware> _logger)
		{
			try
			{
				await next(context);
			}
			catch (Exception ex)
			{
				if (ex is InvalidOperationException && ex.Message.StartsWith("The SPA default page middleware could not return the default page"))
				{

				}
				await HandleExceptionAsync(context, ex, _logger);
			}
		}

		private static Task HandleExceptionAsync(
			HttpContext context,
			Exception exception,
			ILogger<ErrorHandlingMiddleware> _logger)
		{
			var code = HttpStatusCode.InternalServerError; // 500 if unexpected
			_logger.LogError("Unhandled excetion. {0}", exception);
			var result = JsonConvert.SerializeObject(
				new 
				{
					Error = exception.InnerException,
					ErrorDescription = exception.Message
				});
			context.Response.ContentType = "application/json";
			context.Response.StatusCode = (int)code;
			return context.Response.WriteAsync(result);
		}
	}

	// Extension method used to add the middleware to the HTTP request pipeline.
	public static class ErrorHandlingMiddlewareExtensions
	{
		public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<ErrorHandlingMiddleware>();
		}
	}
}
