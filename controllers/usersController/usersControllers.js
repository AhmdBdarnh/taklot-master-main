const userRepository = require('../../repository/userRepository/userRepos');
const { NotFoundError, BadRequsetError } = require('../../errors/err');






// add new User to db
const user_post = async (req, res) => {
  try {
    const new_user = await userRepository.addUser(req.body);
    if (!new_user) throw new BadRequsetError(`User implement is not true`);
       return res.status(200).render("signup");
  } 
  catch (err) {
    res.status(err?.status || 500).json({ message: err.message });
  }
};

// get all User in db
const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.getUserByID(id);
    if (!user || user.length === 0) throw new NotFoundError('User');
    return res.status(200).send(user);
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};

// get signup page
const getSignup = async (req, res) => {
  try {
      res.render('userSignup');
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};

const getLogin = async (req, res) => {
  try {
      res.render('login');
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};
const request = require('../../module/reuqestsSchema/request');

// get get page
const post_Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const resp = await userRepository.checkUser(userName, password);
    
    if (!resp.isMatch) {
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }
    // Redirect to the home page after successful login
    res.redirect('/userHome');
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};


// update user
const user_update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.udpateUser(id,req.body);
    if (!user || user.length === 0) throw new NotFoundError('User');
    return res.status(200).send(user);
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};

// update user
const user_delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.deleteUser(id);
    if (!user || user.length === 0) throw new NotFoundError('User');
    return res.status(200).send(user);
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};

// get all User in db
const getAllUsers = async (req, res) => {
  try {
    const user = await userRepository.gettAllUsers();
    if (!user || user.length === 0) throw new NotFoundError('User');
    return res.status(200).send(user);
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};




// get all User in db
const getName_Number = async _id => {
  try {
    const userData = await userRepository.getName_Number(_id);
    if (!userData || userData.length === 0) throw new NotFoundError('User');
    return userData;
  } 
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};


module.exports = {
  user_post,
  getUserByID,
  getSignup,
  user_update,
  user_delete,
  getAllUsers,
  getLogin,
  post_Login,
  getName_Number,
};