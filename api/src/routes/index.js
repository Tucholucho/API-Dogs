const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getAPIInfo = async () => {
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

const getDBInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
        }
    })
}


module.exports = router;
