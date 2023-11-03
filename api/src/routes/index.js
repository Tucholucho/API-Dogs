const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiURL = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiURL.data.map(el => {
        return{
            name: el.name,
            image: el.image,
            height: el.height.map (el => el),
            weight: el.weight.map (el => el),
            age: el.life_span,
            temperament: el.temperament,
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllDogs = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;

}

router.get('/dogs', async (req,res) => {
    const name = req.query.name;
    let dogsTotal = await getAllDogs();
    if (name){
        let dogName = await dogsTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ?
        res.status(200).send(dogName):
        res.status(404).send("Dog's name doesn't exist.");
    } else {
        res.status(200).send(dogsTotal)
    }

})
module.exports = router;
