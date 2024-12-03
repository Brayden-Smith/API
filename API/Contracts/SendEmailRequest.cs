namespace Schedule.Contracts;

public record SendEmailRequest(string Recipient, string Subject, string Body);