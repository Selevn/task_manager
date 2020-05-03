const router = require('express').Router();
const home_controller = require("../controllers/home_controller");
const passport = require("passport");
const jsonParser = require('express').json();

router.get('/desc/:id',require('../models/auth').checkAuth, home_controller.desc_page);
router.get('/home/',require('../models/auth').checkAuth, home_controller.home_page);

router.post('/get_desks_home_page/',require('../models/auth').checkAuth, home_controller.get_desks_home_page);
router.post('/add_desc/',require('../models/auth').checkAuth,jsonParser,home_controller.add_desc);
router.post('/del_desc/',require('../models/auth').checkAuth,jsonParser,home_controller.del_desc);


router.post('/add_task/',require('../models/auth').checkAuth,jsonParser,home_controller.add_task);
router.post('/upd_task/',require('../models/auth').checkAuth,jsonParser,home_controller.upd_task);
router.post('/delete_task/',require('../models/auth').checkAuth,jsonParser,home_controller.delete_task);

router.post('/get_table_users/',require('../models/auth').checkAuth,jsonParser,home_controller.get_table_users);

router.post('/send_friend_request/',require('../models/auth').checkAuth,jsonParser,home_controller.add_notification);

router.post('/get_notifications/',require('../models/auth').checkAuth,jsonParser,home_controller.get_notifications);
router.post('/get_friend_list/',require('../models/auth').checkAuth,jsonParser,home_controller.get_friend_list);

router.post('/accept_friend/',require('../models/auth').checkAuth,jsonParser,home_controller.accept_friend);
router.post('/accept_desc/',require('../models/auth').checkAuth,jsonParser,home_controller.accept_desc);
router.post('/leave_desc/',require('../models/auth').checkAuth,jsonParser,home_controller.leave_desc);

router.post('/decline_friend/',require('../models/auth').checkAuth,jsonParser,home_controller.decline_friend);
router.post('/decline_desc/',require('../models/auth').checkAuth,jsonParser,home_controller.decline_desc);

router.post('/del_friend/',require('../models/auth').checkAuth,jsonParser,home_controller.del_friend);


router.post('/invite_friend/',require('../models/auth').checkAuth,jsonParser,home_controller.invite_friend);

router.post('/add_user_in_desc/',require('../models/auth').checkAuth,jsonParser,home_controller.add_user_in_desc);


router.post('/ch_person_rules/',require('../models/auth').checkAuth,jsonParser,home_controller.ch_person_rules);
router.post('/kick_person/',require('../models/auth').checkAuth,jsonParser,home_controller.kick_person);

module.exports = router;