import { db, now } from '../firebase';
import { POINT } from '../config';
import { ModelUtil } from '../utils';
import { Product } from '../models';

class User {
  static async createUser(uid, info) {
    const {
      name,
      company,
      scale,
      serviceType,
      department,
      position,
      region,
    } = info;

    const batch = db.batch();

    const userRef = User.fetchUserRef(uid);
    const companyRef = db.collection('company').doc();

    batch.set(companyRef, {
      name: company,
      scale: scale,
      service_type: serviceType,
      region: region,
    });
    batch.set(userRef, {
      name: name,
      position: position,
      department: department,
      company_ref: companyRef,
      point: POINT.INITIAL.value,
      point_history: [Object.assign(POINT.INITIAL, { date: now })],
      can_view: [],
      reviewed: [],
      follow: [],
    });

    batch.commit();
  }

  static updateUser = (uid, info) => {
    const {
      name,
      company,
      scale,
      serviceType,
      department,
      position,
      region,
    } = info;

    const userRef = User.fetchUserRef(uid);

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        const companyRef = doc.data().company_ref;
        transaction.update(userRef, {
          name: name,
          position: position,
          department: department,
        });
        transaction.update(companyRef, {
          name: company,
          scale: scale,
          service_type: serviceType,
          region: region,
        });
      });
    });
  };

  static fetchUserRef = uid => {
    return db.collection('user').doc(uid);
  };

  static changePoint = (uid, saasId, point) => {
    const userRef = User.fetchUserRef(uid);

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        const data = doc.data();
        const newPoint = data.point + point;
        const canView = data.can_view.concat([saasId]);
        const history = ModelUtil.addPointHistory(
          data.point_history,
          POINT.VIEW_REVIEW
        );
        transaction.update(userRef, {
          can_view: canView,
          point: newPoint,
          point_history: history,
        });
      });
    });
  };

  static rewardForInviteUser = uid => {
    const userRef = User.fetchUserRef(uid);
    if (!uid) return;

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        const data = doc.data();
        const newPoint = data.point + POINT.INVITE_USER.value;
        const history = ModelUtil.addPointHistory(
          data.point_history,
          POINT.INVITE_USER
        );
        transaction.update(userRef, {
          point: newPoint,
          point_history: history,
        });
      });
    });
  };

  static deleteUser = uid => {
    User.fetchUserRef(uid).delete();
  };

  static addFollowList = (uid, saasId) => {
    const userRef = User.fetchUserRef(uid);

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        if (!doc.exists) return;

        const followList = doc.data().follow;
        followList.push({ ref: Product.productRef(saasId), isUpdate: false });
        transaction.update(userRef, {
          follow: followList,
        });
      });
    });
  };

  static removeFollowList = (uid, saasId) => {
    const userRef = User.fetchUserRef(uid);

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        if (!doc.exists) return;

        const followList = doc.data().follow;
        const newFollowList = followList.filter(
          saas => saas.ref === Product.productRef(saasId)
        );
        transaction.update(userRef, {
          follow: newFollowList,
        });
      });
    });
  };

  static subscribe = (uid, refreshData) => {
    User.fetchUserRef(uid).onSnapshot(snapshot => {
      refreshData(snapshot.data());
    });
  };

  static infoFollowUpdate = async saasId => {
    const productRef = Product.productRef(saasId);

    const saas = await productRef.get();
    saas.data().followed.forEach(uid => {
      db.runTransaction(transaction => {
        const userRef = User.fetchUserRef(uid);
        return transaction.get(userRef).then(doc => {
          if (!doc.exists) return;

          const follow = doc.data().follow;
          const newFollow = follow.map(element => {
            return element.ref.id === productRef.id
              ? { isUpdate: true, ref: element.ref }
              : element;
          });
          transaction.update(userRef, {
            follow: newFollow,
          });
        });
      });
    });
  };

  static isUpdateToFalse = (uid, saasId) => {
    const userRef = User.fetchUserRef(uid);

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        if (!doc.exists) return;

        const follow = doc.data().follow;
        const newFollow = follow.map(element => {
          return element.ref.id === saasId
            ? { isUpdate: false, ref: element.ref }
            : element;
        });
        transaction.update(userRef, {
          follow: newFollow,
        });
      });
    });
  };
}

export default User;
