using Core.Domain.Entities;
using Core.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Core.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunicationsController : ControllerBase
    {
        private readonly ICoreService coreService;

        public CommunicationsController(ICoreService coreService)
        {
            this.coreService = coreService;
        }

        /// <summary>
        /// Get all Communications
        /// </summary>
        /// <returns>List of Communications with appropriate response code</returns>
        [HttpGet]
        public ActionResult<IEnumerable<Communication>> GetCommunications()
        {
            var communications = coreService.GetCommunications();
            return Ok(communications);
        }

        /// <summary>
        /// Get Communication with specified Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Target Communication with appropriate response code</returns>
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Communication>> GetCommunicationById(int id)
        {
            return Ok(coreService.GetCommunicationById(id));
        }

        /// <summary>
        /// Update Communication with the given object
        /// </summary>
        /// <param name="communication"></param>
        /// <returns>Appropriate response code</returns>
        [HttpPut]
        public ActionResult UpdateCommunication([FromBody] Communication communication)
        {
            coreService.UpdateCommunication(communication);
            return Ok();
        }

        /// <summary>
        /// Create a new Communication 
        /// </summary>
        /// <param name="communication"></param>
        /// <returns>Appropriate response code</returns>
        [HttpPost]
        public ActionResult CreateCommunication([FromBody] Communication communication)
        {
            coreService.CreateCommunication(communication);
            return Ok();
        }

        /// <summary>
        /// Delete Communication with the given Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Appropriate response code</returns>
        [HttpDelete("{id}")]
        public ActionResult DeleteCommunication(int id)
        {
            coreService.DeleteCommunication(id);
            return Ok();
        }
    }
}