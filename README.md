# cash_map

To run the NodeJS/sqlite example:  
-Install the necessary dependencies (node, sqlite, etc.)  
-In a terminal session, run: node server.js  
-In a browser, load: localhost:3000  
-In a separate terminal session: enter a sqlite3 session by entering:  
       sqlite3 database.db
       select * from users;  
-You can add and delete users and check on the users table from the sqlite3 terminal session  

To run the Mastercard Example API: 
-Install dependencies npm/node, and mastercard SDK (npm install mastercard-places --save) 
-Add the CashMap-sandbox.p12 file to a local folder
-Change 'keyStorePath' variable in example_placeById.js to point to .p12 file
-In terminal, run node example_placeById.js



Helpful Links:
-Mastercard API: https://developers.mastercard.com/documentation/locations/1#get%20started
