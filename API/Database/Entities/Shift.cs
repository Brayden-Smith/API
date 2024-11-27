namespace Schedule.Database.Entities
{
    public class Shift
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public DateTime DateTime { get; set; }
        public required string Role { get; set; }
        public string? Username { get; set; }
    }
}
