namespace Schedule.Database.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public required string Name { get; set; } // Role name, e.g., "Admin", "Manager"
        public string? Description { get; set; }
        public required string[]? Permissions { get; set; }
        public required string[]? Exclusivities { get; set; } // Array of exclusives [like intern can't be admin]
        public int? ParentRoleId { get; set; }
        public int[]? ChildRoleIds { get; set; }
    }
}