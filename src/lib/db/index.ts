/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalStorageDB, StorageItem } from "./local";

class HistoryService {
  private collectionName = "history";
  private db: LocalStorageDB;

  constructor() {
    this.db = LocalStorageDB.getInstance();
  }

  public addHistory(data: any): void {
    this.db.add(this.collectionName, data);
  }

  public getAllHistory(): StorageItem[] {
    return this.db.getAll(this.collectionName);
  }

  public deleteHistory(id: string): void {
    this.db.delete(this.collectionName, id);
  }

  public clearHistory(): void {
    this.db.clear(this.collectionName);
  }
}

export const historyService = new HistoryService();

// 使用方法
// // 在任意组件或服务中使用
// import { historyService } from '@/lib/db';

// // 添加历史记录
// historyService.addHistory({ title: 'New Record', description: 'Details about the record' });

// // 获取所有历史记录
// const allHistory = historyService.getAllHistory();
// console.log(allHistory);

// // 删除指定ID的历史记录
// historyService.deleteHistory('_uniqueId');

// // 清除所有历史记录
// historyService.clearHistory();
