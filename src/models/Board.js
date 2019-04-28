import { db } from '../firebase';

class Board {
  static createBoard = (saasId, saas, title, content) => {
    const boardRef = db.collection('board').doc();
    const productRef = db.collection('product').doc(saasId);

    return db
      .runTransaction(transaction => {
        return transaction.get(productRef).then(doc => {
          const board = doc.data().board;
          board.push({ board_id: boardRef.id, title: title });

          transaction.update(productRef, { board: board });
          transaction.set(boardRef, {
            saas: saas,
            title: title,
            content: [content],
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
}

export default Board;
