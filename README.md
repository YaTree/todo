cd project dir
run: npm i

I use global installed "ts-node", if you don't - please install

set env.variables:

export DB_HOST=localhost
export DB_NAME=todos

Run Project:
ts-node src/todo.service/main.ts -- runs todo.service
ts-node src/notification.service/main.ts -- runs "faked" notification service

todo.service runs on 30000 by default
notification.service runs on 30001 by default

You may change the port by setting the env.variable: PORT (*but UI urls are hardcoded, so don't do it :)*)

Pay attention on dates sync between mongoDB and the host where you will run the services.
If you run mongoDB locally in docker you may use this command to run the image with the host machine timezone:
docker run -e TZ=`ls -la /etc/localtime | cut -d/ -f8-9` -p 27017:27017 --name mongo-puper -d mongo

After you run the todo.service - it will populate several todos in the table, so if you are not fast enough, when you
open the notification board, you may see at least one notification, if you are too slow - two notifications)

--------------------------------
There is a simple UI for both services that are available here:
http://localhost:30000/board - you can create/edit/delete TODOS, in order to edit a TODO, you must first set value in
the form, and then click the "EDIT" button for the TODO that you want to be updated.
In "Deadline" field - you can put any string of the Agenda syntax, I tested it with "in 30 seconds", "in 1 minute", "in
5 minutes"

http://localhost:30001/board - here you can see the list of "notifications" that were "sent", it pulls data every 2
seconds

--------------------------------

You can find a postman collection: ToDo.postman_collection.json File

--------------------------------

Code Comments:
in the src - there are three folders: core and two services.

1) Core - contains CRUD interfaces and Core implementation
2) "*.service" - here you will find "main" of the service and business logic of the specific service. in the "services"
folder (of every ".service") - you can find actual implementation for BL. In "controllers" - there is only "fetching"
parameters from the request for BL and mapping into the controllersDTO logic (in our case, there is nothing custom,
everything is straightforward)
