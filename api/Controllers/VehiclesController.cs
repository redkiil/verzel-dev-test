using System.Text.Json;
using api.Data;
using api.Models;
using api.Services;
using LinqKit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace api.Controllers;
public class filterType
{
    public string query { get; set; }
    public string value { get; set; }
}
[Authorize]
[ApiController]
[Route("[controller]")]
public class VehiclesController : ControllerBase
{
    private readonly Context _context;
    public VehiclesController(Context context)
    {
        _context = context;
    }
    [AllowAnonymous]
    [HttpPost("list")]
    public async Task<ActionResult<Vehicle>> GetVehicles([FromBody] JsonElement filters, string by = "Id", string order = "ASC")
    {
        var filterObject = filters.Deserialize<filterType[]>();
        var pr = PredicateBuilder.New<Vehicle>(true);

        foreach (var filter in filterObject)
        {
            if(filter.query == "brand"){
                pr = pr.Or(x => x.Brand == filter.value);
            }else if(filter.query == "model"){
                pr = pr.And(x => x.Model == filter.value);
            }else if(filter.query == "max"){
                pr = pr.And(x => x.Price <= int.Parse(filter.value));
            }else if(filter.query == "min"){
                pr = pr.And(x => x.Price >= int.Parse(filter.value));
            }

        }
        var result = await _context.vehicles.Where(pr).OrderBy($"{by} {order}").ToListAsync();
        return Ok(result);
    }
    [AllowAnonymous]
    [HttpGet("{id}")]
    public ActionResult<Vehicle> GetVehicle(int id)
    {
        var veh = _context.vehicles.FirstOrDefault(b => b.Id == id);
        if(veh == null){
            return NotFound("Veiculo não encontrado!");
        }
        return veh;
    }
    [HttpPost]
    [Consumes("multipart/form-data")]
    public ActionResult<string> PostVehicle([FromForm] Vehicle veh, IFormFile photoFile, [FromHeader] string Authorization)
    {
        if(veh.Photo != null){
            veh.Photo = FileService.UploadCarImage(photoFile);
            if(veh.Photo=="invalid image"){
                return new UnsupportedMediaTypeResult();
            }
        }
        var id = JwtService.ValidateToken(Authorization);
        var vehicle = new Vehicle(){
            Model = veh.Model,
            Brand = veh.Brand,
            Year = veh.Year,
            Hodometer = veh.Hodometer,
            Price = veh.Price,
            Color = veh.Color,
            Doors = veh.Doors,
            Location = veh.Location,
            Photo = veh.Photo,
            UserId = id
        };
        _context.vehicles.Add(vehicle);
        var result = _context.SaveChanges();
        return Ok("Veiculo criado!");
    }
    [HttpPut("{id}")]
    public async Task<ActionResult<Vehicle>> PutVehicle(int id, [FromForm] Vehicle veh, IFormFile photoFile, [FromHeader] string Authorization)
    {
        if(veh.Photo != null){
            veh.Photo = FileService.UploadCarImage(photoFile);
            if(veh.Photo=="invalid image"){
                return new UnsupportedMediaTypeResult();
            }
        }
        var userId = JwtService.ValidateToken(Authorization);
        var exist = _context.vehicles.FirstOrDefault(b => b.Id == id);
        exist.Model = veh.Model;
        exist.Brand = veh.Brand;
        exist.Year = veh.Year;
        exist.Hodometer = veh.Hodometer;
        exist.Price = veh.Price;
        exist.Color = veh.Color;
        exist.Doors = veh.Doors;
        exist.Location = veh.Location;
        exist.UserId = userId;
        if(veh.Photo != null)exist.Photo = veh.Photo;
        await _context.SaveChangesAsync();
        return Ok(veh);
    }
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteVehicle(int id)
    {
        var vehicle = await _context.vehicles.FindAsync(id);
        if (vehicle == null)
        {
            return NotFound();
        }

        _context.vehicles.Remove(vehicle);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [AllowAnonymous]
    [HttpGet("images/{img}")]
    public FileResult LoadImage(string img)
    {        
       return FileService.GetCarImage(img);
    }
}
