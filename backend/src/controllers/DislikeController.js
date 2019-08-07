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

    //Pegando o id targetDev(usuário que está recebendo o dislike) e add na lista de dislikes do Dev logado
    loggedDev.dislikes.push(targetDev._id);

    //Isso serve para salvar no BD
    await loggedDev.save();

    return res.json(loggedDev);
  }
};
