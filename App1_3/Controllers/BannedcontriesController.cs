using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using App1_3.Data;
using App1_3.Models;

namespace App1_3.Controllers
{
    [Route("api/Bannedcontries")]
    [ApiController]
    public class BannedcontriesController : ControllerBase
    {
        private readonly BannedCoutriesContext _context;

        public BannedcontriesController(BannedCoutriesContext context)
        {
            _context = context;
        }

        // GET: api/Bannedcontries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BannedContries>>> GetCoutries()
        {
            return await _context.Coutries.ToListAsync();
        }

        // GET: api/BannedContries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BannedContries>> GetBannedContries(int id)
        {
            var bannedContries = await _context.Coutries.FindAsync(id);

            if (bannedContries == null)
            {
                return NotFound();
            }

            return bannedContries;
        }


        // DELETE: api/BannedContries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBannedContries(int id)
        {
            var bannedContries = await _context.Coutries.FindAsync(id);
            if (bannedContries == null)
            {
                return NotFound();
            }

            _context.Coutries.Remove(bannedContries);
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        // POST: api/BannedContries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BannedContries>> PostBannedContries(BannedContries bannedContries)
        {
            _context.Coutries.Add(bannedContries);
            await _context.SaveChangesAsync();
            return Ok(bannedContries);
           
        }

        // PUT: api/Bannedcontries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBannedContries(int id, BannedContries bannedContries)
        {
            if (id != bannedContries.ContryId)
            {
                return BadRequest();
            }

            _context.Entry(bannedContries).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BannedContriesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        private bool BannedContriesExists(int id)
        {
            return _context.Coutries.Any(e => e.ContryId == id);
        }
    }
}
