namespace ForestClue.Application.Abstractions
{
    public interface IEmailProcessor
    {
        void SendEmail(string to, string subject, string body);
    }
}
