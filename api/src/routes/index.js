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






/*router.get ("/temperaments", async (req,res) => {
    const apiTemperaments = await axios.get("https://api.thedogapi.com/v1/breeds");
    const temperamentsArray = apiTemperaments.data.map (el => el.temperament);
    const temps = temperamentsArray.toString().split(",");
    temps.forEach(element => {
        let i = element.trim();
        Temperaments.findOrCreate({
            where: {name:i}
        })
    });
    const alltemperaments = await Temperaments.findAll();
    res.status(200).send(alltemperaments);
})*/

module.exports = router;
