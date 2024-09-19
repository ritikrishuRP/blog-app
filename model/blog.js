const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');
const Comment = require('./comment')


const Blog = sequelize.define('Blog', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT('long'),
            allowNull: false
        }
    });

    Blog.associate = function(models) {
        
        Blog.hasMany(models.Comment, {
            onDelete: 'CASCADE', 
            foreignKey: 'blogId' 
        });
    };

    module.exports =  Blog;

