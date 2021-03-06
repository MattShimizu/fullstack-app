using Core.Domain.Entities;
using Core.Domain.Interfaces;
using Core.Infrastructure;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Core.Application
{
    public class CoreService : ICoreService
    {
        private readonly CommunicatorDbContext dbContext;
        private readonly ILogger<CoreService> logger;

        public CoreService(CommunicatorDbContext dbContext, ILogger<CoreService> logger)
        {
            this.logger = logger;
            this.dbContext = dbContext;
        }

        /// <summary>
        /// Get all Commmunications in the DbContext
        /// </summary>
        /// <returns> List of Communications objects </returns>
        public List<Communication> GetCommunications()
        {
            return dbContext.Communications.ToList();
        }

        /// <summary>
        /// Get a single Communication with the given Id
        /// </summary>
        /// <param name="id"> Id of the Communication object to fetch </param>
        /// <returns> Found Communication object</returns>
        public Communication GetCommunicationById(int id)
        {
            return dbContext.Communications.FirstOrDefault(c => c.Id == id);
        }

        /// <summary>
        /// Add the given Communication object to the database
        /// </summary>
        /// <param name="communication"> Communication object to insert </param>
        public void CreateCommunication(Communication communication)
        {
            communication.DateSent = new DateTimeOffset();
            dbContext.Communications.Add(communication);
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Update an existing Communication with the given object
        /// </summary>
        /// <param name="communication"> Updated Communicaiton object </param>
        public void UpdateCommunication(Communication communication)
        {
            var com = dbContext.Communications.FirstOrDefault(c => c.Id == communication.Id);

            // Update values
            com.DateSent = new DateTimeOffset();
            com.From = communication.From;
            com.To = communication.To;
            com.Subject = communication.Subject;
            com.Message = communication.Message;
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Delete a single Communication with the given Id
        /// </summary>
        /// <param name="id"> Id of the Communication object to delete </param>
        public void DeleteCommunication(int id)
        {
            dbContext.Communications.Remove(GetCommunicationById(id));
            dbContext.SaveChanges();
        }
    }
}