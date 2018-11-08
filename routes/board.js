const express = require('express');
const check = require('./check');

const board_table = require('../models').Board;
const user_table = require('../models').User;

const router = express.Router();

const dataSize = 10;

/* GET users listing. */
router.get("/", function(req, res) {
    res.render('board/boardMain', {isLoggedIn: true});
});

router.get('/list', function(req, res) {
    board_table.findAll({
        attributes: ['id', 'title', 'createdAt'],
        include: {
            model: user_table,
            attributes: ['name'],
        },
        offset: 0,
        limit: dataSize,
        order: [['createdAt', 'ASC']]
    })
        .then(function(list) {
            const data_list = new Array();
            for(let i=0;i<list.length;i++) {
                data_list.push(list[i].dataValues);
            }
            makePaging(res, data_list, 1);
        })
        .catch(function(err) {
            console.error(err);
        });
});



router.get('/write', check.isLoggedIn_doWrite, function(req, res) {
    res.render("board/boardWrite");
});

router.post('/save', check.isLoggedIn_doWrite, function(req, res) {
    const info = req.body;
    board_table.create({
        title: info.title,
        content: info.content,
        author_id: req.user.id,
        date: info.createdAt,
    })
        .then(function() {
            res.json({message: "Saved complete!"});
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get('/page/:num', function(req, res) {
    const currentPage = req.params.num;
    const start = (currentPage - 1) * dataSize;
    board_table.findAll({
        attributes: ['id', 'title', 'createdAt'],
        include: {
            model: user_table,
            attributes: ['name']
        },
        offset: start,
        limit: dataSize,
        order: [['createdAt', 'ASC']],
    })
        .then(function(list) {
            const data_list = new Array();
            for(let i=0;i<list.length;i++) {
                data_list.push(list[i].dataValues);
            }
            makePaging(res, data_list, currentPage);
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get('/info/:num', function(req, res) {
    board_table.find({
        where: { id: req.params.num }
    })
        .then(function(info) {
            // console.log(info);
            if(req.user)
                res.render('board/boardDetail', {info: info, currentUser: req.user.id});
            else
                res.render('board/boardDetail', {info: info, currentUser: null});
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.patch('/update/:num', function(req, res) {
    board_table.update({
        title: req.body.title,
        content: req.body.content,
    }, {
        where: { id: req.params.num }
    })
        .then(function() {
            res.json({result: true});
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.delete('/delete/:num', function(req, res) {
    board_table.destroy({
        where: { id: req.params.num }
    })
        .then(function() {
            res.json({result: true});
        })
        .catch(function(err) {
            console.error(err);
        })
});

function makePaging(res, data_list, currentPage) {
    board_table.findAll({
        attributes: ['id']
    })
        .then(function(list) {
            const totalPage = Math.ceil(list.length/dataSize);
            res.json({list: data_list, totalPage: totalPage, currentPage: currentPage});
        })
        .catch(function (err) {
            console.error(err);
        })
}

module.exports = router;
