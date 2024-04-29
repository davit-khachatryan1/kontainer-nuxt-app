// start-pm2.mjs
import pm2 from 'pm2';
import { pm2Configs } from './nuxt.config.js';

// Connect to PM2
pm2.connect(function(err) {
  if (err) {
    console.error("Failed to connect to PM2:", err);
    process.exit(2);
  }
  console.log("Connected to PM2 successfully.");

  // Start the PM2 with the given configuration
  pm2.start(pm2Configs, function(err, apps) {
    if (err) {
      console.error("Error starting the application with PM2:", err);
      process.exit(2);
    }
    console.log("Application started successfully with PM2.");
    
    // List running processes to confirm
    pm2.list((err, processList) => {
      if (err) {
        console.error("Failed to list PM2 processes:", err);
        pm2.disconnect();  // Disconnects from PM2
        process.exit(2);
      }

      console.log("Currently running PM2 processes:");
      processList.forEach(process => {
        console.log(`App: ${process.name}, ID: ${process.pm_id}, Status: ${process.pm2_env.status}`);
      });

      pm2.disconnect();   // Disconnects from PM2
    });
  });
});
