const { createReadStream } = require('fs');
const { join } = require('path');

function Serve(res, directory, file) {
  const stream = createReadStream(
    join(__dirname, '../', directory, file),
    'utf-8'
  );
  stream.pipe(res);
  stream.on('close', () => res.end);
}

module.exports = Serve;
