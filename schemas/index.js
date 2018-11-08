const mongoose = require('mongoose');

module.exports = function() {
    const connect = function () {
        // 쿼리 내용을 콘솔을 통해 확인
        if(process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        
        // 몽구스와 몽고디비를 연결 (주소형식 mongodb://[name:password@]host[:port][/[database][?option]])
        mongoose.connect('mongodb://root:qlalfqjsgh@localhost:27017/admin', {
            dbName: 'nodejs',
        }, function(err) {
            if(err) {
                console.log('몽고디비 연결 에러', err);
            } else {
                console.log('몽고디비 연결 성공');
            }
        });
    };
    connect();
    
    // 에러나 연결 종료시 로그 기록 및 재연결
    mongoose.connection.on('error', function(err) {
        console.error('몽고디비 연결 에러', err);
    });
    mongoose.connection.on('disconnected', function() {
        console.error('몽고디비 연결이 끊어졌습니다. 연결을 재시도합니다.');
        connect();
    });
    
    // item 스키마와 연결
    require('./item');
};