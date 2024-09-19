const path = require('path');

const Blog = require('./model/blog');
const Comment = require('./model/comment');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const blogRoutes = require('./router/blog.route')

var cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', blogRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


Blog.hasMany(Comment, { foreignKey: 'blogId', onDelete: 'CASCADE' });
Comment.belongsTo(Blog, { foreignKey: 'blogId', onDelete: 'CASCADE' });


sequelize
  .sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
