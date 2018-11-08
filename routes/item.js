const express = require('express');
const router = express.Router();
const item_table = require('../models').Item;
const item_schema = require('../schemas/item');

const dataSize = 10;

router.get('/', function(req, res) {
  res.render("item/item");
});

router.get('/list', function(req, res) {
    // item_table.findAll({
    //     offset: 0,
    //     limit: dataSize,
    //     order: [['createdAt', 'ASC']]
    // })
    //     .then(function(list) {
    //         let data_list = new Array();
    //         for(let i=0;i<list.length;i++) {
    //             data_list.push(list[i].dataValues);
    //         }
    //         makePaging(res, data_list, 1);
    //     })
    //     .catch(function(err) {
    //         console.log(err);
    //     });
    item_schema.find({}).sort({date: 1}).limit(10)
        .then(function(list) {
            makePaging(res, list, 1);
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.post('/save', function(req, res) {
    // item_table.create({
    //     item: req.body.item,
    //     content: req.body.content,
    //     state: req.body.state,
    //     duration: req.body.duration,
    //     createdAt: req.body.date
    // })
    //     .then(function () {
    //         res.json({result: true});
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });
    const data = new item_schema({
        item: req.body.item,
        content: req.body.content,
        state: req.body.state,
        duration: req.body.duration,
        createdAt: req.body.date,
    });

    data.save()
        .then(function() {
            res.json({result: true});
        })
        .catch(function(err) {
            console.error(err)
        });
});

router.get('/page/:num', function (req, res) {
    const currentPage = req.params.num;
    const start = (currentPage-1)*dataSize;
    // item_table.findAll({
    //     offset: start,
    //     limit: dataSize,
    //     order: [['createdAt', 'ASC']]
    // })
    //     .then(function (list) {
    //         let data_list = new Array();
    //         for(let i=0;i<list.length;i++) {
    //             data_list.push(list[i].dataValues);
    //         }
    //         makePaging(res, data_list, currentPage);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });
    item_schema.find({}).limit(10).skip(start)
        .then(function(list) {
            makePaging(res, list, currentPage);
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.delete('/delete/:item', function (req, res) {
    // item_table.destroy({
    //     where: {
    //         id: req.params.item
    //     }
    // })
    //     .then(function() {
    //         res.json({result: true});
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });
    item_schema.remove({_id: req.params.item})
        .then(function() {
            res.json({result: true});
        })
        .catch(function(err) {
            console.error(err);
        });
});

function makePaging(res, data_list, currentPage) {
    item_table.findAll({
        attributes: ['id']
    })
        .then(function (list) {
            const totalPage = Math.ceil(list.length/dataSize);
            res.json({list: data_list, totalPage: totalPage, currentPage: currentPage});
        })
        .catch(function (err) {
            console.log(err);
        });
}

module.exports = router;