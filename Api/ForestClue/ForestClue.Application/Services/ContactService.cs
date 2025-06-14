using ForestClue.Application.Abstractions;
using ForestClue.Domain.Requests;

namespace ForestClue.Application.Services
{
    public class ContactService(IEmailProcessor emailProcessor) : IContactService
    {
        public void SendEmail(EmailRequest emailRequest)
        {
            emailProcessor.SendEmail(emailRequest.To, emailRequest.Subject, emailRequest.Body);
        }
    }
}
