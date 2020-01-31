const bcrypt = require('bcryptjs');
module.exports = {
    register,
    login,
    logout,
    getCustomer,
    changePassword
}

function register(req, res) {
    const db = req.app.get('db');
    const { username, password, email } = req.body;
    db.checkEmail(email).then(found => {
        // console.log(found);

        if(!username){
            res.status(411).json("Username is empty!");
            throw new Error("Username is empty!");
        }
        if(!password){
            res.status(411).json("Password is empty!");
            throw new Error("Password is empty!");
        }
        if(!email){
            res.status(411).json("Email is empty!");
            throw new Error("Email is empty!");
        }

        if (found[0]) {
            res.status(409).json("Email taken");
            throw new Error("Email taken");
        } else {
            return bcrypt.genSalt(12);
        }
    }).then(salt => {
        return bcrypt.hash(password, salt);
    }).then(hash => {
        return db.registerCustomer(email, username, hash);
    }).then(newUser => {
        req.session.customer = {
            customer_id: newUser[0].customer_id,
            email: newUser[0].email,
            username: newUser[0].username
        }
        res.status(201).json(req.session.customer);
    }).catch(err => {
        console.log("this is err msg:", err)
    });

}

function login(req,res){
    const db = req.app.get('db');
    const { email, password } = req.body;
    let foundUser;
    db.checkEmail(email).then(found => {
        // console.log(found);
        if (!found[0]) {
            res.status(403).json("Email or password incorrect!");
            throw new Error("Email or password incorrect!");
        } else {
            foundUser = found[0]
            return bcrypt.compare(password, foundUser.hash);
        }
    }).then(authUser => {
        if(!authUser){
            res.status(403).json("Email or password incorrect!");
        }else{
            req.session.customer = {
                customer_id: foundUser.customer_id,
                email: foundUser.email,
                username: foundUser.username
            }
            res.status(200).json(req.session.customer);
        }
    }).catch(err => {
        console.log("this is err msg:", err)
    });
}

function changePassword(req,res){
    const db = req.app.get('db');
    const { email, oldPassword, newPassword } = req.body;
    let foundUser;
    db.checkEmail(email).then(found => {
        console.log(found);
        if (!found[0]) {
            throw new Error("Email or password incorrect!");
        } else {
            foundUser = found[0];
            console.log(foundUser);
            
            return bcrypt.compare(oldPassword, foundUser.hash);
        }
    }).then(authUser => {
        if(!authUser){
            throw new Error("Email or password incorrect!");
        }else{
            return bcrypt.genSalt(12);
        }
    }).then(salt => {
        return bcrypt.hash(newPassword, salt);
    }).then(hash => {
        return db.updatePassword(hash, foundUser.customer_id);
    }).then(() => {
        res.status(200).json(req.session.customer);
    }).catch(err => {
        console.log("this is err msg:", err)
        res.status(403).json("Email or password incorrect!");
    });
}

function logout(req,res){
    req.session.destroy();
    res.status(200).json('logout');
}

function getCustomer(req,res){
    res.status(200).json(req.session.customer);
}