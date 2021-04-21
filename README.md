# express-sessions-mongo
simple express https srv with auth and sessions/cookies stored on MongoDB

- POST /login - login and create session [passing object with creadential {"user": "user", "password": "password"}]
- POST /data - storing some data [passing generic object]
- GET /session - get session info and data

try it on https://api.giona.tech

- example POST call https://api.giona.tech/login passing {"user": "test", "password": "test"} => then GET call https://api.giona.tech/session
