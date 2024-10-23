using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Schedule.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleController : ControllerBase
    {
        [HttpGet(Name = "GetSchedule")]
        public string Get()
        {
            
            const string connectionUri = "mongodb+srv://Brayden:nj1NFMrtiYJefpcs@teamscheduler.iww3k.mongodb.net/?retryWrites=true&w=majority&appName=TeamScheduler";
            var settings = MongoClientSettings.FromConnectionString(connectionUri);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            try {
                var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
                Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
            } catch (Exception ex) {
                Console.WriteLine(ex);
            }

            return "hi";
        }
    }
}