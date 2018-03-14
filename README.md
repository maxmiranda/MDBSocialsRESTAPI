# API For MDB Socials Mobile App
Built for MDB Training Program

## Architecture
- logic: each file pertains to a specific node in your firebase database, logic is specific to that object (i.e. cat.js represents all db operations on a cat node)
- routers: each file pertains to a specific node in your firebase database, routing is specific to how you want client devices to interact with your database (i.e. /cats gets all cat objects)
- util: util files that assist with logic file operations (i.e. database wrapper methods you might need)
