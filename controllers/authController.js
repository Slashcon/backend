const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GlobalUser } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await GlobalUser.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    ...(email ? [{ email: email }] : [])
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Username or email already exists' });
        }

        let discriminator;
        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 10) {
            discriminator = Math.floor(1000 + Math.random() * 9000).toString();
            const existingDiscriminator = await GlobalUser.findOne({
                where: {
                    username: username,
                    discriminator: discriminator
                }
            });

            if (!existingDiscriminator) {
                isUnique = true;
            }
            attempts++;
        }

        if (!isUnique) {
            return res.status(600).json({ error: 'Could not generate unique discriminator' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await GlobalUser.create({
            uuid: uuidv4(),
            username,
            discriminator,
            email: email || null,
            password_hash: hashedPassword
        });

        const token = generateToken(user.id);

        const { password_hash, ...userWithoutPassword } = user.toJSON();
        res.status(201).json({
            token,
            user: userWithoutPassword
        });
    }   catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        if (!username && !email) {
            return res.status(400).json({ error: 'Username or email is required' });
        }

        const user = await GlobalUser.findOne({
            where: {
                [Op.or]: [
                    ...GlobalUser(username ? [{ username: username }] : []),
                    ...GlobalUser(email ? [{ email: email }] : [])
                ]
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (req.ip) {
            await user.update({ last_ip_address: req.ip });
        }

        const token = generateToken(user.id);

        const { password_hash, ...userWithoutPassword } = user.toJSON();
        res.status(200).json({
            token,
            user: userWithoutPassword
        });
    }   catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await GlobalUser.findByPk(req.user.id, {
            attributes: { exclude: ['password_hash'] }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    }   catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Failed to get user info' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { username, email, bio, avatar_filename, banner_color } = req.body;

        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (bio !== undefined) updates.bio = bio;
        if (avatar_filename) updates.avatar_filename = avatar_filename;
        if (banner_color) updates.banner_color = banner_color;

        const user = await req.user.update(updates);

        const { password_hash, ...userWithoutPassword } = user.toJSON();
        res.status(200).json({ user: userWithoutPassword });
    }   catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new passwords are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters' });
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, req.user.password_hash);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        await req.user.update({ password_hash: hashedNewPassword });

        res.status(200).json({ message: 'Password updated successfully' });
    }   catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
};

module.exports = {
    register,
    login,
    getCurrentUser,
    updateProfile,
    changePassword
};