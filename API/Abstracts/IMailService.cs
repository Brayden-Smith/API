using Schedule.Contracts;

namespace Schedule.Abstracts;

public interface IMailService
{
    Task SendEmailAsync(SendEmailRequest sendEmailRequest);
}