/* eslint-disable no-plusplus */
const express = require('express');
const router = express.Router();

let count=0

router.post('/login', (req, res, next) => {
    count+=1;
    res.json({
        data: Boolean(count%2)?
        {
          status: 0,
          data: {
           user:{
                _id: "5c3b297dea95883f340178b0",
                password: "admin",
                username: "admin",
           },
            create_time: 1547381117891,
            __v: 0,
            role: {
              menus: []
            }
          }
      }
	  :
	    {
        status: 1,
        msg: "用户名或密码不正确!"
      }
    });
});

module.exports = router;
