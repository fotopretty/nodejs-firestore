// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {expect} from 'chai';
import * as extend from 'extend';
import {GrpcClient} from 'google-gax';
import {Duplex} from 'stream';
import * as through2 from 'through2';

import * as proto from '../../protos/firestore_v1_proto_api';
import {Firestore} from '../../src';
import {ClientPool} from '../../src/pool';
import {DocumentData, GapicClient} from '../../src/types';

import api = proto.google.firestore.v1;

const v1 = require('../../src/v1');

/* tslint:disable:no-any */
const grpc = new GrpcClient({} as any).grpc;
const SSL_CREDENTIALS = (grpc.credentials as any).createInsecure();
/* tslint:enable:no-any */

export const PROJECT_ID = 'test-project';
export const DATABASE_ROOT = `projects/${PROJECT_ID}/databases/(default)`;
export const COLLECTION_ROOT = `${DATABASE_ROOT}/documents/collectionId`;
export const DOCUMENT_NAME = `${COLLECTION_ROOT}/documentId`;

// Allow invalid API usage to test error handling.
// tslint:disable-next-line:no-any
export type InvalidApiUsage = any;

/** Defines the request handlers used by Firestore. */
export type ApiOverride = Partial<GapicClient>;

/**
 * Creates a new Firestore instance for testing. Request handlers can be
 * overridden by providing `apiOverrides`.
 *
 * @param apiOverrides An object with request handlers to override.
 * @param firestoreSettings Firestore Settings to configure the client.
 * @return A Promise that resolves with the new Firestore client.
 */
export function createInstance(
  apiOverrides?: ApiOverride,
  firestoreSettings?: {}
): Promise<Firestore> {
  const initializationOptions = {
    ...{projectId: PROJECT_ID, sslCreds: SSL_CREDENTIALS},
    ...firestoreSettings,
  };

  const firestore = new Firestore();
  firestore.settings(initializationOptions);

  firestore['_clientPool'] = new ClientPool<GapicClient>(
    /* concurrentRequestLimit= */ 1,
    /* maxIdleClients= */ 0,
    () => ({...new v1(initializationOptions), ...apiOverrides})
  );

  return Promise.resolve(firestore);
}

/**
 * Verifies that all streams have been properly shutdown at the end of a test
 * run.
 */
export function verifyInstance(firestore: Firestore): Promise<void> {
  // Allow the setTimeout() call in _initializeStream to run before
  // verifying that all operations have finished executing.
  return new Promise<void>(resolve => {
    setTimeout(() => {
      expect(firestore['_clientPool'].opCount).to.equal(0);
      resolve();
    }, 10);
  });
}

function write(
  document: api.IDocument | null,
  mask: api.IDocumentMask | null,
  transforms: api.DocumentTransform.IFieldTransform[] | null,
  precondition: api.IPrecondition | null
): api.ICommitRequest {
  const writes: api.IWrite[] = [];

  if (document) {
    const update = Object.assign({}, document);
    delete update.updateTime;
    delete update.createTime;
    writes.push({update});
    if (mask) {
      writes[0].updateMask = mask;
    }
  }

  if (transforms) {
    writes.push({
      transform: {document: DOCUMENT_NAME, fieldTransforms: transforms},
    });
  }

  if (precondition) {
    writes[0].currentDocument = precondition;
  }

  return {writes};
}

export function updateMask(...fieldPaths: string[]): api.IDocumentMask {
  return fieldPaths.length === 0 ? {} : {fieldPaths};
}

export function set(opts: {
  document?: api.IDocument;
  transforms?: api.DocumentTransform.IFieldTransform[];
  mask?: api.IDocumentMask;
}): api.ICommitRequest {
  return write(
    opts.document || null,
    opts.mask || null,
    opts.transforms || null,
    null
  );
}

export function update(opts: {
  document?: api.IDocument;
  transforms?: api.DocumentTransform.IFieldTransform[];
  mask?: api.IDocumentMask;
  precondition?: api.IPrecondition;
}): api.ICommitRequest {
  const precondition = opts.precondition || {exists: true};
  const mask = opts.mask || updateMask();
  return write(
    opts.document || null,
    mask,
    opts.transforms || null,
    precondition
  );
}

export function create(opts: {
  document?: api.IDocument;
  transforms?: api.DocumentTransform.IFieldTransform[];
  mask?: api.IDocumentMask;
}): api.ICommitRequest {
  return write(
    opts.document || null,
    /* updateMask */ null,
    opts.transforms || null,
    {
      exists: false,
    }
  );
}

function value(value: string | api.IValue): api.IValue {
  if (typeof value === 'string') {
    return {
      stringValue: value,
    };
  } else {
    return value;
  }
}

export function retrieve(id: string): api.IBatchGetDocumentsRequest {
  return {documents: [`${DATABASE_ROOT}/documents/collectionId/${id}`]};
}

export function remove(
  id: string,
  precondition?: api.IPrecondition
): api.ICommitRequest {
  const writes: api.IWrite[] = [
    {delete: `${DATABASE_ROOT}/documents/collectionId/${id}`},
  ];

  if (precondition) {
    writes[0].currentDocument = precondition;
  }

  return {writes};
}

export function found(
  dataOrId: api.IDocument | string
): api.IBatchGetDocumentsResponse {
  return {
    found: typeof dataOrId === 'string' ? document(dataOrId) : dataOrId,
    readTime: {seconds: 5, nanos: 6},
  };
}

export function missing(id: string): api.IBatchGetDocumentsResponse {
  return {
    missing: `${DATABASE_ROOT}/documents/collectionId/${id}`,
    readTime: {seconds: 5, nanos: 6},
  };
}

export function document(
  id: string,
  field?: string,
  value?: string | api.IValue,
  ...fieldOrValues: Array<string | api.IValue>
): api.IDocument {
  const document: api.IDocument = {
    name: `${DATABASE_ROOT}/documents/collectionId/${id}`,
    fields: {},
    createTime: {seconds: 1, nanos: 2},
    updateTime: {seconds: 3, nanos: 4},
  };

  if (field !== undefined) {
    fieldOrValues = [field, value!].concat(fieldOrValues);

    for (let i = 0; i < fieldOrValues.length; i += 2) {
      const field = fieldOrValues[i] as string;
      const value = fieldOrValues[i + 1];

      if (typeof value === 'string') {
        document.fields![field] = {
          stringValue: value,
        };
      } else {
        document.fields![field] = value;
      }
    }
  }

  return document;
}

export function serverTimestamp(
  field: string
): api.DocumentTransform.IFieldTransform {
  return {fieldPath: field, setToServerValue: 'REQUEST_TIME'};
}

export function incrementTransform(
  field: string,
  n: number
): api.DocumentTransform.IFieldTransform {
  return {
    fieldPath: field,
    increment: Number.isInteger(n) ? {integerValue: n} : {doubleValue: n},
  };
}

export function arrayTransform(
  field: string,
  transform: 'appendMissingElements' | 'removeAllFromArray',
  ...values: Array<string | api.IValue>
): api.DocumentTransform.IFieldTransform {
  const fieldTransform: api.DocumentTransform.IFieldTransform = {
    fieldPath: field,
  };

  fieldTransform[transform] = {values: values.map(val => value(val))};

  return fieldTransform;
}

export function writeResult(count: number): api.IWriteResponse {
  const response: api.IWriteResponse = {
    commitTime: {
      nanos: 0,
      seconds: 1,
    },
  };

  if (count > 0) {
    response.writeResults = [];

    for (let i = 1; i <= count; ++i) {
      response.writeResults.push({
        updateTime: {
          nanos: i * 2,
          seconds: i * 2 + 1,
        },
      });
    }
  }

  return response;
}

export function requestEquals(
  actual: object | undefined,
  expected: object
): void {
  expect(actual).to.not.be.undefined;

  // 'extend' removes undefined fields in the request object. The backend
  // ignores these fields, but we need to manually strip them before we compare
  // the expected and the actual request.
  actual = extend(true, {}, actual);
  const proto = Object.assign({database: DATABASE_ROOT}, expected);
  expect(actual).to.deep.eq(proto);
}

export function stream<T>(...elements: Array<T | Error>): Duplex {
  const stream = through2.obj();

  setImmediate(() => {
    for (const el of elements) {
      if (el instanceof Error) {
        stream.destroy(el);
        return;
      }
      stream.push(el);
    }
    stream.push(null);
  });

  return stream;
}

/** Creates a response as formatted by the GAPIC request methods.  */
export function response<T>(result: T): Promise<[T, unknown, unknown]> {
  return Promise.resolve([result, undefined, undefined]);
}

export class Post {
  constructor(readonly title: string, readonly author: string) {}
  byline(): string {
    return this.title + ', by ' + this.author;
  }
}

export const postConverter = {
  toFirestore(post: Post): DocumentData {
    return {title: post.title, author: post.author};
  },
  fromFirestore(data: DocumentData): Post {
    return new Post(data.title, data.author);
  },
};
