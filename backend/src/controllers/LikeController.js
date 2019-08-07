const Dev = require('../models/Dev');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    //Verifica se o usuário que está recebendo o like existe
    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    //Verifica se o loggedDev(Dev dando like) está na lista de likes do targetDev(Dev recebendo like),
    // pra ver se da MATCH
    if (targetDev.likes.includes(loggedDev._id)) {
      console.log('DEU MATCH');
    }

    //Pegando o id targetDev(usuário que está recebendo o like) e add na lista de likes do Dev logado
    loggedDev.likes.push(targetDev._id);

    //Isso serve para salvar no BD
    await loggedDev.save();

    return res.json(loggedDev);
  }
};
