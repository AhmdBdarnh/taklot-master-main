const userRepository = require('../../repository/userRepository/userRepos');
const techRepository = require('../../repository/technicalReoistory/technicalRepos');
const reqRepository = require('../../repository/requestRepostiory/requesRepos');

const { NotFoundError, BadRequsetError } = require('../../errors/err');




// add new User to db
const user_post = async (req, res) => {
  try {
    const new_user = await userRepository.addUser(req.body);
    if (!new_user) throw new BadRequsetError(`User implement is not true`);
       res.redirect('/login');

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
  } catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
};


const post_Login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await userRepository.checkUser(userName, password);
    if (!user) {
      const technical = await techRepository.checkUser(userName, password);
      if (!technical) {
        throw new NotFoundError('User');
      } else {
        res.redirect(`/home/technical/?technicalId=${technical.technicalId}`);
      }
    } else {
      res.redirect(`/home/helpseeker/?helpseekerId=${user.userId}`);
    }
  } catch (err) {
    if (res.headersSent) {
      console.error('Headers already sent, unable to send error response');
    } else {
      return res.status(err?.status || 500).json({ message: err.message });
    }
  }
};


const getUserPage = async (req, res) => {
  try {
    const helpseekerId = req.query.helpseekerId;
    const userData = await userRepository.getName_Number(helpseekerId);
    const request = await reqRepository.getRequestByUserID(helpseekerId);

    return res.render('userHome',{userData,request,helpseekerId});
  }
  catch (err) {
    return res.status(err?.status || 500).json({ message: err.message });
  }
}



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
  getUserPage,

};