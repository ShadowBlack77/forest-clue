namespace ForestClue.Domain.Constants
{
    public static class IdentityRoleConstants
    {
        public static readonly Guid AdminRoleGuid = new("db5a1f15-6964-4ac3-b756-e33c306dde97");
        public static readonly Guid UserRoleGuid = new("edde9d7c-fb1e-4362-a143-3f8138d30392");
        public static readonly Guid ManagerRoleGuid = new("39743f61-7aff-449e-ad08-27c073080171");

        public const string Admin = "Admin";
        public const string User = "User";
        public const string Manager = "Manager";
    }
}