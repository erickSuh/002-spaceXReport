const express = require('express');
const app = express();
const { getShips } = require('./space');

app.get('/', async (req, res) => {
  const { data, error } = await getShips();
  if (error) {
    res.send(`Error: ${error}`);
    return;
  }
  res.send(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
