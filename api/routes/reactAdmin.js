/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
const express = require('express');
const router = express.Router();

let count = 0;

router.post('/login', (req, res, next) => {
    count += 1;
    res.json({
        data: count % 2
            ? {
                status: 0,
                data: {
                    user: {
                        _id: '5c3b297dea95883f340178b0',
                        password: 'admin',
                        username: 'admin',
                    },
                    create_time: 1547381117891,
                    __v: 0,
                    role: {
                        menus: []
                    }
                }
            } : {
                status: 1,
                msg: '用户名或密码不正确!'
            }
    });
});

/**
 * 商品分类列表的子列表
*/
router.get('/manage/category/list/:id', async(req, res, next) => {
    const options = {
        id: req.params.id
    };
    console.log('apiDetail:', req.params.id);
    res.json({
        data: {
            status: 0,
            data: [
                {
                    parentId: '0001',
                    id: '00001',
                    name: '洗衣机',
                    v: 0
                },
                {
                    parentId: '0001',
                    id: '00002',
                    name: '电视',
                    v: 0
                },
                {
                    parentId: '0001',
                    id: '00003',
                    name: '冰箱',
                    v: 0
                },
            ]
        }
    });
});
/*
* 商品分类列表
*/
router.get('/manage/category/list', (req, res, next) => {
    res.json({
        data: {
            status: 0,
            data: [
                {
                    parentId: '0',
                    id: '0001',
                    name: '家用电器',
                    v: 0
                },
                {
                    parentId: '0',
                    id: '0002',
                    name: '电脑',
                    v: 0
                },
                {
                    parentId: '0',
                    id: '0003',
                    name: '图书',
                    v: 0
                },
                {
                    parentId: '0',
                    id: '0004',
                    name: '服装',
                    v: 0
                },
                {
                    parentId: '0',
                    id: '0005',
                    name: '鞋子',
                    v: 0
                }
            ]
        }
    });
});

/*
* 添加商品分类列表
*/
router.post('/manage/category/add', (req, res, next) => {
    const options = {
        id: req.params.parentId,
        name: req.query.categoryName,
    };
    console.log(options);
    res.json({
        data: {
            status: 0,
            data: [
                {
                    parentId: '0',
                    _id: '0001',
                    name: '家用电器',
                    _v: 0
                },
                {
                    parentId: '0',
                    _id: '0002',
                    name: '电脑',
                    _v: 0
                },
                {
                    parentId: '0',
                    _id: '0003',
                    name: '图书',
                    _v: 0
                },
            ]
        }
    });
});
module.exports = router;
