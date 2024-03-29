import { Board } from '../models';
import { PATH } from '../config';
import { UrlUtil } from '../utils';

class Discussion {
  static createNewBoard = async (history, saasId, saas, user, info) => {
    const { title, content } = info;
    const { name } = saas;
    if (!saasId || !title || !name || !user || !content) return;

    const boardId = await Board.createBoard(
      saasId,
      name,
      title,
      user.name,
      content
    );
    history.push(UrlUtil.changeBaseUrl(PATH.BOARD, boardId));
  };

  static getBoardById = async id => {
    if (!id) return;

    const data = await Board.getById(id).get();
    return data;
  };

  static postToBoard = (boardId, user, body) => {
    if (!boardId || !user || !body) return;

    Board.post(boardId, user, body);
  };

  static subscribeBoard = (boardId, refreshBoard) => {
    if (!boardId) return;

    Board.subscribe(boardId, refreshBoard);
  };
}

export default Discussion;
