const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');
const Blog = require('./blog')


const Comment = sequelize.define('Comment', {
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        blogId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Blogs',
                key: 'id'
            }
        }
    });

    Comment.associate = function(models) {
        
        Comment.belongsTo(models.Blog, {
            foreignKey: 'blogId',
            onDelete: 'CASCADE'
        });
    };

module.exports =  Comment;

