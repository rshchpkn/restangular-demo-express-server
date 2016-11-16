import { Router, Response, Request } from 'express';
import * as uuid from 'node-uuid';
import {heroes} from "../heroes/heroes"

export const heroesRouter: Router = Router();

heroesRouter.get('/', (request: Request, response: Response) => {
  if(request.query.number){
    response.json(heroes.slice(0,request.query.number))
  }
  else {
    response.json(heroes);
  }

});

heroesRouter.get('/:id', (request: Request, response: Response) => {

  if(!heroes[request.params.id]) {
    response.status(403).json({
      message: 'Invalid id'
    });
  }
  else {
    response.json(heroes[request.params.id]);
  }

});

heroesRouter.post('/', (request: Request, response: Response) => {

  if(request.body.hasOwnProperty("id")){
    heroes.splice(request.body.id,1)
  }

  response.json(heroes);

});

heroesRouter.put('/:id', (request: Request, response: Response) => {


  if(!heroes[request.params.id]) {
    response.status(403).json({
      message: 'Invalid id'
    });
  }

  if(request.body.hasOwnProperty("name") && request.params.id){
    heroes[request.params.id] = request.body;
  }

  response.json(heroes);

});


// export { heroesRouter }
