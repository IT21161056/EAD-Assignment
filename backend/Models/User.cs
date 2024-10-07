using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using MongoDbGenericRepository.Attributes;
using MongoDB.Bson.Serialization.Attributes; // For BsonElement
using MongoDB.Bson; // For Required and EnumDataType attributes

namespace backend.Models
{
    [CollectionName("Users")]
    public class User : MongoIdentityUser<string>
    {

        [PersonalData]
        public string Firstname { get; set; }

        [PersonalData]
        public string Lastname { get; set; }

        [PersonalData]
        public string Phone { get; set; }

        public string Role { get; set; }

        [BsonElement("status")]
        public bool IsApproved { get; set; } = false;
    }

}
