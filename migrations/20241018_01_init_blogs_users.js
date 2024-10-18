const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        // Create users table first
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isAlphanumeric: {
                        args: true,
                        msg: 'Only letters and numbers are allowed for username'
                    }
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Not a valid email'
                    }
                }
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password_hash'
            },
            bio: {
                type: DataTypes.TEXT
            },
            image: {
                type: DataTypes.STRING,
                validate: {
                    isUrl: true
                }
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'updated_at'
            }
        });

        // Create blogs table after users table
        await queryInterface.createTable('blogs', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: DataTypes.STRING,
                validate: {
                    isAlpha: {
                        args: true,
                        msg: 'Only letters are allowed for author name'
                    }
                }
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: {
                        args: true,
                        msg: 'Not a valid url'
                    }
                }
            },
            description: {
                type: DataTypes.TEXT
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                field: 'user_id'
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'updated_at'
            }
        });
    },

    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('blogs');
        await queryInterface.dropTable('users');
    },
};
