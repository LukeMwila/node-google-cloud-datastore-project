const express = require('express');
const router = express.Router();

// utils
const {
  createTeam,
  listTeams,
  getTeam,
  updateTeam,
  deleteTeam
} = require('./utils');

router.post('', async (req, res) => {
  const response = await createTeam(req.body);
  res.status(201).send(response);
});

router.get('', async (req, res) => {
  const teams = await listTeams();
  res.status(200).send(teams);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const team = await getTeam(id);
  res.status(200).send(team);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const response = await updateTeam(id, req.body);
  res.status(200).send(response);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const response = await deleteTeam(id);
  res.status(200).send(response);
});

module.exports = router;
