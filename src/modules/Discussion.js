import { Board } from '../models';

class Discussion {
  static createNewBoard = (saasId, saas, info) => {
    const { title, content } = info;
    const { name } = saas;
    if (!saasId || !title || !name || !content) return;

    Board.createBoard(saasId, name, title, content);
  };
}

export default Discussion;
