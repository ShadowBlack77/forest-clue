using ForestClue.Application.Abstractions;
using ForestClue.Infrastructure.Options;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using MailKit.Security;

namespace ForestClue.Infrastructure.Processors
{
    public class EmailProcessor(IOptions<EmailOptions> emailOptions) : IEmailProcessor
    {
        public void SendEmail(string to, string subject, string body)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse(emailOptions.Value.Username));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = body
            };

            using var smtp = new SmtpClient();

            smtp.Connect(emailOptions.Value.Host, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(emailOptions.Value.Username, emailOptions.Value.Password);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
