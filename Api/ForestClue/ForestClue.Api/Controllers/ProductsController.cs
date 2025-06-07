using ForestClue.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private static List<Product> products = new List<Product>
        {
            new Product()
            {
                Id = 1,
                Name = "Backpack",
                Description = "Nice Backpack",
                Category = "backpackes",
                Price = 100.00D,
                InStock = 10,
                ImageUrl = "https://portdesigns.com/img/cms/Produits/BP%20HOUSTON%20ECO/110265%20-%20110276%20-%20PORT%20-%20HOUSTON%20II%20ECO%20BP%20-%20PERS.jpg",
                Featured = false
            }
        };

        [HttpGet]
        public ActionResult<List<Product>> GetAll()
        {
            return Ok(products);
        }
    }
}
