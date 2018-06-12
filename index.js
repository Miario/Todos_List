var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

var todoRoutes = require('./routes/todos');

app.get('/', function(req, res) {
	res.send('Hello from root Route');
});

app.use('/api/todos', todoRoutes);


app.listen(port, () => console.log('app is running on port 3000'));