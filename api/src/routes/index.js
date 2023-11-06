const { Router } = require('express');
const axios = require('axios');
const {Dog, Temperament} = require ("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get ("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiUrl.data.map (el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height.map (el => el),
            weight: el.weight.map (el => el),
            life_span: el.life_span,
            temperament: el.temperament,
        };
    });
    return apiInfo;
};


const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Ocupattion,
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
        const dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.lenght ?
        res.status(200).send(dogName):
        res.status(500).send("No se ha encontrado un resultado");
    } else{
        res.status(200).send(dogsTotal)
    }
})

router.get("/temperaments", async (req,res) => {
    const temperamentsApi = axios.get("https://api.thedogapi.com/v1/breeds");
    const temperaments = temperamentsApi.data.map(el => el.temperament);
    const allTemperaments = await temperaments.findAll();
    res(200).send(allTemperaments);
})

module.exports = router;
