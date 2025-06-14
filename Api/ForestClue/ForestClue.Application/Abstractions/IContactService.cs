using ForestClue.Domain.Requests;

namespace ForestClue.Application.Abstractions
{
    public interface IContactService
    {
        void SendEmail(EmailRequest emailRequest);
    }
}
