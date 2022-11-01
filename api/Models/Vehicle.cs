namespace api.Models;

public class Vehicle
{
    public int Id {get;set;}
    public string Model {get;set;}
    public string Brand {get;set;}
    public int Year {get;set;}
    public int Hodometer {get;set;}
    public int Price {get;set;}
    public string Color {get;set;}
    public int Doors {get;set;}
    public string Location {get;set;}
    public string Description {get;set;}
    public string Photo {get;set;}
    public int UserId { get; set; }
    public User User { get; set; }
}
