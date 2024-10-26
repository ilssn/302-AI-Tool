/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StorageItem {
  id: string;
  data: any;
  timestamp: number;
}

export class LocalStorageDB {
  private static instance: LocalStorageDB;

  private constructor() {}

  public static getInstance(): LocalStorageDB {
    if (!LocalStorageDB.instance) {
      LocalStorageDB.instance = new LocalStorageDB();
    }
    return LocalStorageDB.instance;
  }

  private getCollection(collectionName: string): StorageItem[] {
    const collection = localStorage.getItem(collectionName);
    return collection ? JSON.parse(collection) : [];
  }

  private saveCollection(collectionName: string, items: StorageItem[]): void {
    localStorage.setItem(collectionName, JSON.stringify(items));
  }

  public add(collectionName: string, data: any): void {
    const collection = this.getCollection(collectionName);
    const newItem: StorageItem = {
      id: this.generateId(),
      data,
      timestamp: Date.now(),
    };
    collection.push(newItem);
    this.saveCollection(collectionName, collection);
  }

  public getAll(collectionName: string): StorageItem[] {
    return this.getCollection(collectionName);
  }

  public delete(collectionName: string, id: string): void {
    const collection = this.getCollection(collectionName);
    const updatedCollection = collection.filter((item) => item.id !== id);
    this.saveCollection(collectionName, updatedCollection);
  }

  public clear(collectionName: string): void {
    localStorage.removeItem(collectionName);
  }

  private generateId(): string {
    // Simple unique ID generator (could be replaced with a more robust solution)
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }
}
