using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly Context _context;

        public FilterController(Context context)
        {
            _context = context;
        }
        [HttpGet]
        public ActionResult GetFilters()
        {
            if(_context.vehicles.Any()){
                var maxPrice = _context.vehicles.Max(p=>p.Price);
                var minPrice = _context.vehicles.Min(p=>p.Price);
                var maxHodometer = _context.vehicles.Max(p=>p.Hodometer);

                var brands = _context.vehicles.Select(p => p.Brand).Distinct().ToList();
                var colors = _context.vehicles.Select(p => p.Color).Distinct();
                var location = _context.vehicles.Select(p => p.Location).Distinct();
                var doors = _context.vehicles.Select(p => p.Doors).Distinct();

                Dictionary<string, string[]> data = new Dictionary<string, string[]>();
                foreach(var brand in brands){
                    var ok = _context.vehicles.Where(p => p.Brand == brand).Select(p => p.Model).ToArray();
                    data.Add(brand, ok);
                }


                var filterString = new {
                    Max = maxPrice,
                    Min = minPrice,
                    MaxHodometer = maxHodometer,
                    Vehicles = data,
                    Colors = colors,
                    Location = location,
                    Doors = doors
                };

                return Ok(filterString);
            }
            return Ok(new { });
        }

    }
}