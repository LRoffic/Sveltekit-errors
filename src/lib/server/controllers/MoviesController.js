import axios from "axios";

import db from "$controllers/initDB.js";

import {log} from "$utils/debug";

let Movies = db.movies;

const APIURL = "https://streaming-availability.p.rapidapi.com/v2";

const now = Date.now();

async function callByID(id, country = "fr", output_language = "fr"){
    const options = {
        method: 'GET',
        url: APIURL + '/get/basic',
        params: {
          country: country,
          imdb_id: id,
          output_language: output_language
        },
        headers: {
          'X-RapidAPI-Key': '9286c23f67msh86f6a03b49ef60ap18890ejsn6429e337ff9a',
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    return await axios.request(options).then((response) => { return response.data; }).catch((error) => { return error; });
}

async function get(id){
    return await Movies.findOne({imdb_id : id}).then((data) => {
        if(data){
            if( ((((data.last_update * 1000) * 60) * 60) * 24) * 7 <= now){
                return callByID(id).then(
                    (movie) => {
                        this.update(id)
                        data.json = movie.data;

                        return movie.data;
                    },
                    (error) => {
                        return error;
                    }
                );
            } else {
                return data
            }
        }
        return {"result" : "error", "message" : "Le film n'existe pas ou est introuvable"};
    }, (error) => {
        return create(id).then((data) => {
            return {"result": "error", "message": "Le film n'existe pas mais a été crée"};
        }, (error) => {
            return {"result" : "error", "message" : error}
        });
    });
}

async function create(id){
    return await get(id).then((data) => {
        if(data && data.result === "error"){
            return callByID(id).then((moviedata) => {
                 return Movies.create({
                    imdb_id: id,
                    json: moviedata,
                    created: now,
                    last_update: now
                }).then(() => {
                    return {"result": "success", "message": "Le film a bien été crée avec succès"}
                });
            }, (error) => {
                return {"result" : "error" , "message" : error};
            });
        } else {
            return update(id);
        }
    });
}

async function update(id){
    let movie = await Movies.findOne({id});

    if(movie){
        movie.json = await callByID(id);
        movie.last_update = now;
        movie.save();

        return [{"result": "success", "message": "Le film a bien été modifié"}]
    } else {
        create(id);

        return [{"result": "success", "message": "Le film a bien été crée"}]
    }
}

export default {
    callByID,
    get,
    create,
    update
}