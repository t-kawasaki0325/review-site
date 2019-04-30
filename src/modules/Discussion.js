import { Board } from '../models';
import { PATH } from '../config';
import { UrlUtil } from '../utils';

class Discussion {
  static createNewBoard = async (history, saasId, saas, info) => {
    const { title, content } = info;
    const { name } = saas;
    if (!saasId || !title || !name || !content) return;

    const boardId = await Board.createBoard(saasId, name, title, content);
    history.push(UrlUtil.changeBaseUrl(PATH.BOARD, boardId));
  };

  static getBoardById = async id => {
    if (!id) return;

    const data = await Board.getById(id).get();
    return data;
  };

  static postToBoard = (boardId, body) => {
    if (!boardId || !body) return;

    Board.post(boardId, body);
  };
}

export default Discussion;
