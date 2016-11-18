import {Router, Response, Request} from 'express';
import {Hero} from "../models/heroes";

export const heroesRouter: Router = Router();

heroesRouter.get('/', (request: Request, response: Response) => {
  if (parseInt(request.query.number)) {
    Hero.find({}, null, {limit: +request.query.number}, (err, hero)=> {
      response.json(hero);
    });
  }
  else {
    Hero.find({}, (err, hero)=> {
      response.json(hero);
    });
  }

});

heroesRouter.get('/:id', (request: Request, response: Response) => {

  Hero.findById(request.params.id, (err, hero)=> {
    if (err) {
      response.status(403).json({
        message: 'Invalid id'
      });
    }
    else if(hero) {
      response.json(hero);
    }
    else {
      response.status(403).json({
        message: 'No Hero'
      });
    }
  });


});

heroesRouter.delete('/:id', (request: Request, response: Response) => {

    Hero.findById(request.params.id, (err, hero)=> {
      if (err) {
        response.status(403).json({
          message: 'Invalid id'
        });
      }
    }).remove().exec().then(res => {
        Hero.find({}, (err, hero)=> {
          response.json(hero);
        })
    });

});

heroesRouter.put('/:id', (request: Request, response: Response) => {

  if (request.body.hasOwnProperty("name") && request.params.id) {
    Hero.findById(request.params.id, (err, hero)=> {
      if(err) {
        response.status(403).json({
          message: 'Invalid id'
        });
      }
      // Hero.find(request.params.id)
      hero.update({name: request.body.name}).then(res => {
        Hero.find({},(err,hero)=>{
          response.json(hero);
        })
      });
    });
  }
  else {
    response.status(403).json({
      message: 'Invalid body'
    });
  }
});

heroesRouter.put('/', (request: Request, response: Response) => {

  if (request.body.hasOwnProperty("name")) {
    let hero = new Hero({name: request.body.name});
    hero.save().then(res => {
      Hero.find({},(err,hero)=>{
        response.json(hero);
      })
    });
  }
  else {
    response.status(403).json({
      message: 'Invalid body'
    });
  }
});


