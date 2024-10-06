namespace backend.DTOs
{
    public class CustomerFeedbackDTO
    {
        public string FeedbackId {get; set;}

        public string UserId { get; set; }  

        public string FirstName {get; set;}

        public string LastName {get; set;}

        public string CustomerFeedbackText {get; set;}

        public int Rating {get; set;}
    }

    public class CreateFeedbackDTO
    {
        public string UserId { get; set; }  

        public string FirstName {get; set;}

        public string LastName {get; set;}

        public string CustomerFeedbackText {get; set;}

        public int Rating {get; set;}
    }

    // public class UpdateFeedbackDTO
    // {
    //     public string FeedbackId {get; set;}

    //     public string UserId { get; set; }  

    //     public string FirstName {get; set;}

    //     public string LastName {get; set;}

    //     public string CustomerFeedbackText {get; set;}

    //     public int Rating {get; set;}
    // }
}