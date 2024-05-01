"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const main_class_1 = require("../main-class");
const User_1 = require("../model/User");
const Painting_1 = require("../model/Painting");
const Events_1 = require("../model/Events");
const configureRoutes = (passport, router) => {
    router.get('/', (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.status(200).send('Hello, World!');
    });
    router.get('/callback', (req, res) => {
        let myClass = new main_class_1.MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            }
            else {
                res.write(result);
                res.status(200).end();
            }
        });
    });
    router.get('/promise', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let myClass = new main_class_1.MainClass();
        /* myClass.monitoringPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(400).end();
        }); */
        // async-await
        try {
            const data = yield myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        }
        catch (error) {
            res.write(error);
            res.status(400).end();
        }
    }));
    router.get('/observable', (req, res) => {
        let myClass = new main_class_1.MainClass();
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
            next(data) {
                res.write(data);
            }, error(error) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const isartist = req.body.isartist;
        const user = new User_1.User({ email: email, password: password, name: name, address: address, nickname: nickname, isartist: isartist });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getAllUsers', (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/checkAuth', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        }
        else {
            res.status(500).send(false);
        }
    });
    router.delete('/deleteUser', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User_1.User.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/uploadPainting', (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const artist_name = req.body.artist_name;
        const year = req.body.year;
        const sold = req.body.sold;
        const price = req.body.price;
        const source = req.body.source;
        const email = req.body.email;
        const col_group = req.body.col_group;
        const painting = new Painting_1.Painting({ name: name, description: description, artist_name: artist_name, year: year, sold: sold, price: price, source: source, email: email, col_group: col_group });
        painting.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log('Idáig már legalább eljutottam');
            res.status(500).send(error);
        });
    });
    router.get('/getAllPainting', (req, res) => {
        const query = Painting_1.Painting.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.delete('/deletePainting', (req, res) => {
        if (req.isAuthenticated()) {
            const name = req.query.name;
            const query = Painting_1.Painting.deleteOne({ name: name });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getMyPainting', (req, res) => {
        if (req.isAuthenticated()) {
            const email = req.query.email;
            const query = Painting_1.Painting.find({ email: email });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/userIsArtist', (req, res) => {
        if (req.isAuthenticated()) {
            const email = req.query.email;
            const query = User_1.User.findOne({ email: email });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/registerEvent', (req, res) => {
        const name = req.body.name;
        const description = req.body.description;
        const artist_name = req.body.artist_name;
        const date = req.body.date;
        const max_attendees = req.body.max_attendees;
        const img_source = req.body.img_source;
        const price = req.body.price;
        const painting = new Events_1.Event({ name: name, description: description, artist_name: artist_name, date: date, max_attendees: max_attendees, img_source: img_source, price: price });
        painting.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.get('/getAllEvent', (req, res) => {
        const query = Events_1.Event.find();
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            console.log(error);
            res.status(500).send('Internal server error.');
        });
    });
    router.delete('/deleteEvent', (req, res) => {
        if (req.isAuthenticated()) {
            const name = req.query.name;
            const query = Events_1.Event.deleteOne({ name: name });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getMyEvents', (req, res) => {
        if (req.isAuthenticated()) {
            const artist_name = req.query.artist_name;
            const query = Events_1.Event.find({ artist_name: artist_name });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/EventUpdateUser', (req, res) => {
        const event_name = req.body.name;
        const attendees = req.body.attendees;
        const ferohelyek = req.body.ferohelyek;
        const query = Events_1.Event.updateOne({ name: event_name }, { attendees: attendees, max_attendees: ferohelyek });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/UpdateBasket', (req, res) => {
        const basket = req.body.basket;
        const email = req.body.email;
        const query = User_1.User.updateOne({ email: email }, { basket: basket });
        query.then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    return router;
};
exports.configureRoutes = configureRoutes;
