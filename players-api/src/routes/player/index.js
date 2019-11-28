const express = require('express');
const router = express.Router();

// utils
const {
  createPlayer,
  listPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer
} = require('./utils');

router.post('', async (req, res) => {
  const response = await createPlayer(req.body);
  res.status(201).send(response);
});

router.get('', async (req, res) => {
  const players = await listPlayers();
  res.status(200).send(players);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const player = await getPlayer(id);
  res.status(200).send(player);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const response = await updatePlayer(id, req.body);
  res.status(200).send(response);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const response = await deletePlayer(id);
  res.status(200).send(response);
});

module.exports = router;
