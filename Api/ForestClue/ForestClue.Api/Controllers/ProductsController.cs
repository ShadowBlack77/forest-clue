﻿using ForestClue.Application.Abstractions;
using ForestClue.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
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
            List<Product> featuredProducts = await productService.GetFeaturedAsync();

            return Ok(featuredProducts);
        }

        [Authorize(Roles = "Manager")]
        [HttpPost("create")]
        public ActionResult Create()
        {
            return Ok(); 
        }

        [Authorize(Roles = "Manager")]
        [HttpPut("update")]
        public ActionResult Update()
        {
            return Ok();
        }

        [HttpGet("categories")]
        public async Task<ActionResult<List<Category>>> GetAllCategories()
        {
            List<Category> categories = await categoryService.GetAllAsync();

            return Ok(categories);
        }

        [Authorize(Roles = "Manager")]
        [HttpPost("create-category")]
        public ActionResult CreateCategory()
        {
            return Ok();
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetCount()
        {
            int productsCount = await productService.GetProductsCount();

            return Ok(productsCount);
        }

        [HttpGet("categories/count")]
        public async Task<ActionResult<int>> GetCategoriesCount([FromQuery] string category)
        {
            int categoriesCount = await productService.GetProductsCategoryCountAsync(category);

            return Ok(categoriesCount);
        }
    }
}
