import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Painting } from '../model/Painting';
import { Event } from '../model/Events';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        /* myClass.monitoringPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(400).end();
        }); */


        // async-await
        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });

    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        // deprecated variant
        /* myClass.monitoringObservable().subscribe((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('complete');
        }); */

        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data);
            }, error(error: string) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const isartist = req.body.isartist;
        const user = new User({email: email, password: password, name: name, address: address, nickname: nickname, isartist: isartist});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);            
        } else {
            res.status(500).send(false);
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/uploadPainting',(req:Request,res:Response)=>{
        const name = req.body.name;
        const description = req.body.description;
        const artist_name = req.body.artist_name;
        const year = req.body.year;
        const sold = req.body.sold;
        const price = req.body.price;
        const source = req.body.source;
        const email = req.body.email;
        const col_group = req.body.col_group;
        const painting = new Painting({name: name,description: description,artist_name:artist_name,year:year,sold:sold,price:price,source:source,email:email,col_group:col_group});
        painting.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log('Idáig már legalább eljutottam')
            res.status(500).send(error);
        })
    });

    router.get('/getAllPainting', (req: Request, res: Response) => {
        const query = Painting.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.delete('/deletePainting', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const name = req.query.name;
            const query = Painting.deleteOne({name: name});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getMyPainting', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const email = req.query.email;
            const query = Painting.find({email:email});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/userIsArtist', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const email = req.query.email;
            const query = User.findOne({email:email});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/registerEvent',(req:Request,res:Response)=>{
        const name = req.body.name;
        const description = req.body.description;
        const artist_name = req.body.artist_name;
        const date = req.body.date;
        const max_attendees = req.body.max_attendees;
        const img_source = req.body.img_source;
        const price = req.body.price;
        const painting = new Event({name: name,description: description,artist_name:artist_name,date:date,max_attendees:max_attendees,img_source:img_source,price:price});
        painting.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.get('/getAllEvent', (req: Request, res: Response) => {
        const query = Event.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        })
    });

    router.delete('/deleteEvent', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const name = req.query.name;
            const query = Event.deleteOne({name: name});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getMyEvents', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const artist_name = req.query.artist_name;
            const query = Event.find({artist_name:artist_name});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/EventUpdateUser',(req:Request,res:Response)=>{
        const event_name = req.body.name;
        const attendees = req.body.attendees;
        const ferohelyek = req.body.ferohelyek;
        const query=Event.updateOne({ name: event_name }, { attendees: attendees,max_attendees:ferohelyek});
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/UpdateBasket',(req:Request,res:Response)=>{
        const basket = req.body.basket;
        const email = req.body.email;
        const query=User.updateOne({ email: email}, {basket:basket});
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    return router;
}