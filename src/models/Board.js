import { db } from '../firebase';

class Board {
  static createBoard = (saasId, saas, title, content) => {
    const boardRef = db.collection('board').doc();
    const productRef = db.collection('product').doc(saasId);

    db.runTransaction(transaction => {
      return transaction.get(productRef).then(doc => {
        const board = doc.data().board;
        board.push({ ref: boardRef, title: title });

        transaction.update(productRef, { board: board });
        transaction.set(boardRef, {
          saas: saas,
          title: title,
          content: [content],
        });
      });
    });
  };
}

export default Board;
