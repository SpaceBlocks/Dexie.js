/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

export type IndexableTypePart =
string | number | Date | ArrayBuffer | ArrayBufferView | DataView | Array<Array<void>>;

export type IndexableTypeArray = Array<IndexableTypePart>;
export type IndexableTypeArrayReadonly = ReadonlyArray<IndexableTypePart>;
export type IndexableType = IndexableTypePart | IndexableTypeArrayReadonly;

export type IDBValidKey = IndexableType;

export interface IDBCursor {
  readonly direction: IDBCursorDirection;
  key: IDBValidKey;
  readonly primaryKey: any;
  source: IDBObjectStore | IDBIndex;
  advance(count: number): void;
  continue(key?: IDBKeyRange | IDBValidKey): void;
  delete(): IDBRequest;
  update(value: any): IDBRequest;
  readonly NEXT: string;
  readonly NEXT_NO_DUPLICATE: string;
  readonly PREV: string;
  readonly PREV_NO_DUPLICATE: string;
}

export declare var IDBCursor: {
  prototype: IDBCursor;
  new(): IDBCursor;
  readonly NEXT: string;
  readonly NEXT_NO_DUPLICATE: string;
  readonly PREV: string;
  readonly PREV_NO_DUPLICATE: string;
};

export interface IDBCursorWithValue extends IDBCursor {
  readonly value: any;
}

export declare var IDBCursorWithValue: {
  prototype: IDBCursorWithValue;
  new(): IDBCursorWithValue;
};

export interface IDBDatabaseEventMap {
  "abort": Event;
  "error": Event;
}

export interface IDBDatabase extends EventTarget {
  readonly name: string;
  readonly objectStoreNames: DOMStringList;
  onabort: (this: IDBDatabase, ev: Event) => any;
  onerror: (this: IDBDatabase, ev: Event) => any;
  version: number;
  onversionchange: (ev: IDBVersionChangeEvent) => any;
  close(): void;
  createObjectStore(name: string, optionalParameters?: IDBObjectStoreParameters): IDBObjectStore;
  deleteObjectStore(name: string): void;
  transaction(storeNames: string | string[], mode?: IDBTransactionMode): IDBTransaction;
  addEventListener(type: "versionchange", listener: (ev: IDBVersionChangeEvent) => any, useCapture?: boolean): void;
  addEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, useCapture?: boolean): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  removeEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, useCapture?: boolean): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

export declare var IDBDatabase: {
  prototype: IDBDatabase;
  new(): IDBDatabase;
};

export interface IDBFactory {
  cmp(first: any, second: any): number;
  deleteDatabase(name: string): IDBOpenDBRequest;
  open(name: string, version?: number): IDBOpenDBRequest;
}

export declare var IDBFactory: {
  prototype: IDBFactory;
  new(): IDBFactory;
};

export interface IDBIndex {
  keyPath: string | string[];
  readonly name: string;
  readonly objectStore: IDBObjectStore;
  readonly unique: boolean;
  multiEntry: boolean;
  count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
  get(key: IDBKeyRange | IDBValidKey): IDBRequest;
  getKey(key: IDBKeyRange | IDBValidKey): IDBRequest;
  openCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
  openKeyCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
}

export declare var IDBIndex: {
  prototype: IDBIndex;
  new(): IDBIndex;
};

export interface IDBKeyRange {
  readonly lower: any;
  readonly lowerOpen: boolean;
  readonly upper: any;
  readonly upperOpen: boolean;
}

export declare var IDBKeyRange: {
  prototype: IDBKeyRange;
  new(): IDBKeyRange;
  bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
  lowerBound(lower: any, open?: boolean): IDBKeyRange;
  only(value: any): IDBKeyRange;
  upperBound(upper: any, open?: boolean): IDBKeyRange;
};

export interface IDBObjectStore {
  readonly indexNames: DOMStringList;
  keyPath: string | string[];
  readonly name: string;
  readonly transaction: IDBTransaction;
  autoIncrement: boolean;
  add(value: any, key?: IDBValidKey): IDBRequest;
  clear(): IDBRequest;
  count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
  createIndex(name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters): IDBIndex;
  delete(key: IDBKeyRange | IDBValidKey): IDBRequest;
  deleteIndex(indexName: string): void;
  get(key: any): IDBRequest;
  index(name: string): IDBIndex;
  openCursor(range?: IDBKeyRange | IDBValidKey, direction?: IDBCursorDirection): IDBRequest;
  put(value: any, key?: IDBValidKey): IDBRequest;
}

export declare var IDBObjectStore: {
  prototype: IDBObjectStore;
  new(): IDBObjectStore;
};

export interface IDBOpenDBRequestEventMap extends IDBRequestEventMap {
  "blocked": Event;
  "upgradeneeded": IDBVersionChangeEvent;
}

export interface IDBOpenDBRequest extends IDBRequest {
  onblocked: (this: IDBOpenDBRequest, ev: Event) => any;
  onupgradeneeded: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any;
  addEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, useCapture?: boolean): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  removeEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, useCapture?: boolean): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

export declare var IDBOpenDBRequest: {
  prototype: IDBOpenDBRequest;
  new(): IDBOpenDBRequest;
};

export interface IDBRequestEventMap {
  "error": Event;
  "success": Event;
}

export interface IDBRequest extends EventTarget {
  readonly error: DOMException;
  onerror: (this: IDBRequest, ev: Event) => any;
  onsuccess: (this: IDBRequest, ev: Event) => any;
  readonly readyState: IDBRequestReadyState;
  readonly result: any;
  source: IDBObjectStore | IDBIndex | IDBCursor;
  readonly transaction: IDBTransaction;
  addEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest, ev: IDBRequestEventMap[K]) => any, useCapture?: boolean): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  removeEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest, ev: IDBRequestEventMap[K]) => any, useCapture?: boolean): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

export declare var IDBRequest: {
  prototype: IDBRequest;
  new(): IDBRequest;
};

export interface IDBTransactionEventMap {
  "abort": Event;
  "complete": Event;
  "error": Event;
}

export interface IDBTransaction extends EventTarget {
  readonly db: IDBDatabase;
  readonly error: DOMException;
  readonly mode: IDBTransactionMode;
  onabort: (this: IDBTransaction, ev: Event) => any;
  oncomplete: (this: IDBTransaction, ev: Event) => any;
  onerror: (this: IDBTransaction, ev: Event) => any;
  abort(): void;
  objectStore(name: string): IDBObjectStore;
  readonly READ_ONLY: string;
  readonly READ_WRITE: string;
  readonly VERSION_CHANGE: string;
  addEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, useCapture?: boolean): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  removeEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, useCapture?: boolean): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

export declare var IDBTransaction: {
  prototype: IDBTransaction;
  new(): IDBTransaction;
  readonly READ_ONLY: string;
  readonly READ_WRITE: string;
  readonly VERSION_CHANGE: string;
};

export interface IDBVersionChangeEvent extends Event {
  readonly newVersion: number | null;
  readonly oldVersion: number;
}

export declare var IDBVersionChangeEvent: {
  prototype: IDBVersionChangeEvent;
  new(): IDBVersionChangeEvent;
};