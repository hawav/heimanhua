import mongoose, { Schema } from 'mongoose';

mongoose.connect('mongodb://172.23.100.100/heimanhua', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const chapterSchema = Schema({
  id: Number,
  name: String
});

export const Comic = mongoose.model('Comic', {
  comic_id: { type: Number, index: true, unique: true },
  comic_name: String,
  last_chapter: chapterSchema,
  class_idlist: String,
  update_time: Date,
  total_click: Number,
  dashang: Number,
  pingfen: Number,
  zongpiao: Number
});

// /**
//  * 获取数据库连接
//  * @returns {Promise<mongoose.Model<mongoose.Document, {}>>} 数据库连接
//  */
// export function GetDBConnection() {
//   return new Promise((resolve, reject) => {
//     if (dbConnected) resolve(db);
//     if (connecting) {
//       resolves.push(resolve);
//       return;
//     }
//     connecting = true;
//     resolves.push(resolve);

//     console.log('发起连接');

//     const db = mongoose.connection;
//     mongoose.connection.db.once(
//       'error',
//       console.error.bind(console, 'connection error:')
//     );
//     db.once('error', reject);
//     db.once('open', () => {
//       dbConnected = true;
//       resolves.forEach(r => r(Comic));
//       resolves = [];
//     });
//   });
// }
