# express-sessions-mongo
simple express https srv with auth and sessions/cookies stored on MongoDB

- POST /login - login and create session -  passing object with creadential {"user": "user", "passoword": "password"}
- POST /data - passing data - passing generic object 
- GET  /session - get session info and data

try it on https://giona.sytes.net

- example POST call https://giona.sytes.net/login passing {"user": "test", "passoword": "test"} => then GET call https://giona.sytes.net/session
