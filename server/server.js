const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// statically serve everything in the build folder on the route '/build'
if(process.env.NODE_ENV === 'production') {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});