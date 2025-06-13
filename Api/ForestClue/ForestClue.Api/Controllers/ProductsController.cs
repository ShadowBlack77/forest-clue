using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ForestClue.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IProductService productService, ICategoryService categoryService) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string category)
        {
            List<Product> products = await productService.GetAllAsync();

            if (!string.IsNullOrWhiteSpace(category) && category != "all")
            {
                products = products.Where(x => x.Category.Name == category).ToList();
            }

            products = products
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(products);
        }

        [HttpGet("featured")]
        public async Task<ActionResult<List<Product>>> GetFeatured()
        {
            List<Product> products = await productService.GetAllAsync();

            products = products.Where(x => x.Featured).ToList();

            return Ok(products);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<List<Category>>> GetAllCategories()
        {
            List<Category> categories = await categoryService.GetAllAsync();

            return Ok(categories);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetCount()
        {
            List<Product> products = await productService.GetAllAsync();

            return products.Count();
        }
    }
}
