const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// CORS設定
app.use(cors({
  origin: 'https://ctn-net.jp',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// JSON形式のリクエストを解析するためのミドルウェア
app.use(bodyParser.json());

// MySQLデータベースに接続
const db = mysql.createConnection({
  host: 'sv14133.xserver.jp',
  user: 'xs557112_2tg5x',
  password: 'rie30l5ub0',  // rootユーザーのパスワード
  database: 'xs557112_ad1cus'
});

// MySQLに接続して確認
db.connect((err) => {
  if (err) {
    console.error('MySQL接続エラー:', err);
  } else {
    console.log('MySQLに接続されました');
  }
});

// ルートパスのハンドラー
app.get('/api/save-data', (req, res) => {
  res.send('サーバーは正常に動作しています。');
});

app.post('/api/save-data', (req, res) => {
  console.log('POSTリクエストを受け取りました:', req.body);

  const {
    name = '',
    zipcode = '',
    address = '',
    email = '',
    saved_utm_param = '',
    ip = '',
    fpc = '',
    inflowURL = '',
    CarName = '',
    carmet = '',
    month = '',
    Meka = '',
    caryear = '',
    carversion = '',
    color = '',
    auto = '',
    history = ''
  } = req.body;

  const query = `
    INSERT INTO car_data (name, zipcode, address, email, saved_utm_param, ip, fpc, inflowURL, CarName, carmet, month, Meka, caryear, carversion, color, auto, history)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    name = VALUES(name), zipcode = VALUES(zipcode), address = VALUES(address),
    saved_utm_param = VALUES(saved_utm_param), ip = VALUES(ip), fpc = VALUES(fpc),
    inflowURL = VALUES(inflowURL), CarName = VALUES(CarName), carmet = VALUES(carmet),
    month = VALUES(month), Meka = VALUES(Meka), caryear = VALUES(caryear),
    carversion = VALUES(carversion), color = VALUES(color), auto = VALUES(auto),
    history = VALUES(history);
  `;

  db.query(query, [name, zipcode, address, email, saved_utm_param, ip, fpc, inflowURL, CarName, carmet, month, Meka, caryear, carversion, color, auto, history], (err, result) => {
    if (err) {
      console.error('データ保存エラー:', err.message);
      res.status(500).send('データ保存に失敗しました');
    } else {
      res.status(200).send('データが保存されました');
      console.log('データがMySQLに保存されました');
    }
  });
});

// サーバーレス関数としてエクスポート
module.exports = app;
