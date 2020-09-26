import Dexie from "dexie";
import dexieObservable from "dexie-observable";
import dexieSyncable from "dexie-syncable";
import { dexieCloudSyncProtocol } from "./dexieCloudSyncProtocol";

const DEXIE_CLOUD_PROTOCOL_NAME = "dexie.cloud";

dexieSyncable.registerSyncProtocol(
  DEXIE_CLOUD_PROTOCOL_NAME,
  dexieCloudSyncProtocol
);

//
// Extend Dexie interface
//
declare module "dexie" {
  interface Dexie {
    cloud: {
      version: string;
      /**
       * Connect to given URL
       */
      connect(url: string): Promise<void>;
    };
  }

  interface DexieConstructor {
    Cloud: {
      (db: Dexie): void;

      version: string;
    };
  }
}

export function DexieCloud(db: Dexie) {
  // Make it possible to only add dexieCloud addon by auto-
  // registering the observable and syncable:
  if (!db.observable) dexieObservable(db);
  if (!db.syncable) dexieSyncable(db);
  db.cloud = {
    version: "{version}",
    connect (url) {
      return db.syncable.connect(DEXIE_CLOUD_PROTOCOL_NAME, url, {});
    }
  }
}

DexieCloud.version = "{version}";

Dexie.Cloud = DexieCloud;

Dexie.addons.push(DexieCloud);

export default DexieCloud;