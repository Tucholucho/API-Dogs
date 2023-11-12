const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperaments} = require ("../db");
const express = require('express');



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get ("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiUrl.data.map (el => {
        let temperamentsArray = [];
        if (el.temperament) temperamentsArray = el.temperament.split (", ");
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            temperaments: temperamentsArray,
            image: el.image,
        };
    });
    return apiInfo;
};


const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        }
    });
};

const getAllDogs = async () => {
    const apiDogs = await getApiInfo();
    const dBDogs = await getDbInfo();
    const allDogs = apiDogs.concat(dBDogs);
    return allDogs;
}


router.get ("/dogs", async (req,res) => {
    const name = req.query.name;
    const dogsTotal = await getAllDogs();
    if (name){
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
        res.status(200).send(dogName):
        res.status(404).send("No se ha encontrado un resultado");
    } else{
        res.status(200).send(dogsTotal)
    }
})

router.get ("/temperaments", async (req,res) => {
    const apiTemperaments = await axios.get("https://api.thedogapi.com/v1/breeds");
    const temperaments = apiTemperaments.data.map (el => el.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(element => {
        let i = element.trim();
        Temperaments.findOrCreate({
            where: {name:i}
        });
    });
    const allTemperaments = await Temperaments.findAll();
    res.status(200).send(allTemperaments);
})

router.get("/dogs/:idRaza", async (req,res) => {
    const {idRaza} = req.params;
    const allDogs = await getAllDogs();
    const thatDog = allDogs.filter ( el => el.id == idRaza);
    if (thatDog.length){
        res.status(200).send(thatDog);
    } else{
        res.status(404).send("Dog doesn't found");
    }
})

router.post("/dogs", async (req,res) => {
    let {
        max_height,
        min_height,
        max_weight,
        min_weight,
        name,
        temperaments,
        image,
    } = req.body

    const heightRange = min_height + " - " + max_height;
    const weightRange = min_weight + " - " + max_weight;

    let dog = await Breed.create({
        name,
        height: heightRange,
        weight: weightRange,
        image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg"
    })

    let selectedTemperament = await Temperaments.findAll({
        where: {name : temperaments},
    })

    dog.addTemperament(selectedTemperament),

    res.status(200).send("Dog Created")
});

router.use(express.json),

module.exports = router;
