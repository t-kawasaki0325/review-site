import { db, now } from '../firebase';

class Board {
  static createBoard = (saasId, saas, title, user, content) => {
    const boardRef = db.collection('board').doc();
    const productRef = db.collection('product').doc(saasId);

    return db
      .runTransaction(transaction => {
        return transaction.get(productRef).then(doc => {
          const board = doc.data().board;
          board.push({ board_id: boardRef.id, title: title });

          transaction.update(productRef, { board: board });
          transaction.set(boardRef, {
            saas_id: saasId,
            saas: saas,
            title: title,
            content: [
              {
                user: user,
                body: content,
                created_at: now,
              },
            ],
          });
        });
      })
      .then(() => {
        return boardRef.id;
      });
  };

  static getById = id => {
    return db.collection('board').doc(id);
  };

  static post = async (id, user, body) => {
    const ref = db.collection('board').doc(id);
    const snapshot = await ref.get();
    if (!snapshot.exists) return;

    db.runTransaction(transaction => {
      return transaction.get(ref).then(doc => {
        const content = doc.data().content;
        content.push({ user: user, body: body, created_at: now });

        transaction.update(ref, { content: content });
      });
    });
  };

  static subscribe = (id, refreshBoard) => {
    db.collection('board')
      .doc(id)
      .onSnapshot(snapshot => {
        refreshBoard(snapshot.data());
      });
  };
}

export default Board;
