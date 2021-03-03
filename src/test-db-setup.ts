/* eslint-disable jest/no-done-callback */
import mongoose, { Document, Error, Model } from 'mongoose';
import cuid from 'cuid';
import { Item } from './resources/item/item.model';
import { List } from './resources/list/list.model';
import { User } from './resources/user/user.model';
import _map from 'lodash.map';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      newId(): mongoose.Types.ObjectId;
    }
  }
}

const models: Record<string, Model<Document>> = { User, List, Item };
const url =
  process.env.MONGODB_URI ||
  process.env.DB_URL ||
  'mongodb://localhost:27017/tipe-devapi-testing';

mongoose.set('useCreateIndex', true);

global.newId = () => {
  return mongoose.Types.ObjectId();
};

const deleteMany = (collection: mongoose.Collection): Promise<void> =>
  new Promise((resolve, reject) => {
    collection.deleteMany((err: Error) => {
      if (err) return reject(err);
      resolve();
    });
  });

beforeEach(async (done) => {
  const db = cuid();
  function clearDB() {
    return Promise.all(_map(mongoose.connection.collections, deleteMany));
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(url + db, {
        useNewUrlParser: true,
        autoIndex: true,
        useUnifiedTopology: true,
      });
      await clearDB();
      await Promise.all(Object.keys(models).map((name) => models[name].init()));
    } catch (e) {
      console.log('connection error');
      console.error(e);
      throw e;
    }
  } else {
    await clearDB();
  }
  done();
});
afterEach(async (done) => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});
afterAll((done) => {
  return done();
});
