/*!
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/// <reference types="node" />
import * as gax from 'google-gax';
import { Callback, ClientOptions } from 'google-gax';
import { Transform } from 'stream';
import * as protosTypes from '../../protos/firestore_v1beta1_proto_api';
/**
 *  The Cloud Firestore service.
 *
 *  This service exposes several types of comparable timestamps:
 *
 *  *    `create_time` - The time at which a document was created. Changes only
 *       when a document is deleted, then re-created. Increases in a strict
 *        monotonic fashion.
 *  *    `update_time` - The time at which a document was last updated. Changes
 *       every time a document is modified. Does not change when a write results
 *       in no modifications. Increases in a strict monotonic fashion.
 *  *    `read_time` - The time at which a particular state was observed. Used
 *       to denote a consistent snapshot of the database or the time at which a
 *       Document was observed to not exist.
 *  *    `commit_time` - The time at which the writes in a transaction were
 *       committed. Any read with an equal or greater `read_time` is guaranteed
 *       to see the effects of the transaction.
 * @class
 * @memberof v1beta1
 */
export declare class FirestoreClient {
    private _descriptors;
    private _innerApiCalls;
    private _terminated;
    auth: gax.GoogleAuth;
    firestoreStub: Promise<{
        [name: string]: Function;
    }>;
    /**
     * Construct an instance of FirestoreClient.
     *
     * @param {object} [options] - The configuration object. See the subsequent
     *   parameters for more details.
     * @param {object} [options.credentials] - Credentials object.
     * @param {string} [options.credentials.client_email]
     * @param {string} [options.credentials.private_key]
     * @param {string} [options.email] - Account email address. Required when
     *     using a .pem or .p12 keyFilename.
     * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
     *     .p12 key downloaded from the Google Developers Console. If you provide
     *     a path to a JSON file, the projectId option below is not necessary.
     *     NOTE: .pem and .p12 require you to specify options.email as well.
     * @param {number} [options.port] - The port on which to connect to
     *     the remote host.
     * @param {string} [options.projectId] - The project ID from the Google
     *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
     *     the environment variable GCLOUD_PROJECT for your project ID. If your
     *     app is running in an environment which supports
     *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
     *     your project ID will be detected automatically.
     * @param {function} [options.promise] - Custom promise module to use instead
     *     of native Promises.
     * @param {string} [options.apiEndpoint] - The domain name of the
     *     API remote host.
     */
    constructor(opts?: ClientOptions);
    /**
     * The DNS address for this API service.
     */
    static readonly servicePath: string;
    /**
     * The DNS address for this API service - same as servicePath(),
     * exists for compatibility reasons.
     */
    static readonly apiEndpoint: string;
    /**
     * The port for this API service.
     */
    static readonly port: number;
    /**
     * The scopes needed to make gRPC calls for every method defined
     * in this service.
     */
    static readonly scopes: string[];
    getProjectId(): Promise<string>;
    getProjectId(callback: Callback<string, undefined, undefined>): void;
    getDocument(request: protosTypes.google.firestore.v1beta1.IGetDocumentRequest, options?: gax.CallOptions): Promise<[protosTypes.google.firestore.v1beta1.IDocument, protosTypes.google.firestore.v1beta1.IGetDocumentRequest | undefined, {} | undefined]>;
    getDocument(request: protosTypes.google.firestore.v1beta1.IGetDocumentRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.firestore.v1beta1.IDocument, protosTypes.google.firestore.v1beta1.IGetDocumentRequest | undefined, {} | undefined>): void;
    createDocument(request: protosTypes.google.firestore.v1beta1.ICreateDocumentRequest, options?: gax.CallOptions): Promise<[protosTypes.google.firestore.v1beta1.IDocument, protosTypes.google.firestore.v1beta1.ICreateDocumentRequest | undefined, {} | undefined]>;
    createDocument(request: protosTypes.google.firestore.v1beta1.ICreateDocumentRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.firestore.v1beta1.IDocument, protosTypes.google.firestore.v1beta1.ICreateDocumentRequest | undefined, {} | undefined>): void;
    updateDocument(request: protosTypes.google.firestore.v1beta1.IUpdateDocumentRequest, options?: gax.CallOptions): Promise<[protosTypes.google.firestore.v1beta1.IDocument, protosTypes.google.firestore.v1beta1.IUpdateDocumentRequest | undefined, {} | undefined]>;
    updateDocument(request: protosTypes.google.firestore.v1beta1.IUpdateDocumentRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.firestore.v1beta1.IDocument, protosTypes.google.firestore.v1beta1.IUpdateDocumentRequest | undefined, {} | undefined>): void;
    deleteDocument(request: protosTypes.google.firestore.v1beta1.IDeleteDocumentRequest, options?: gax.CallOptions): Promise<[protosTypes.google.protobuf.IEmpty, protosTypes.google.firestore.v1beta1.IDeleteDocumentRequest | undefined, {} | undefined]>;
    deleteDocument(request: protosTypes.google.firestore.v1beta1.IDeleteDocumentRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.protobuf.IEmpty, protosTypes.google.firestore.v1beta1.IDeleteDocumentRequest | undefined, {} | undefined>): void;
    beginTransaction(request: protosTypes.google.firestore.v1beta1.IBeginTransactionRequest, options?: gax.CallOptions): Promise<[protosTypes.google.firestore.v1beta1.IBeginTransactionResponse, protosTypes.google.firestore.v1beta1.IBeginTransactionRequest | undefined, {} | undefined]>;
    beginTransaction(request: protosTypes.google.firestore.v1beta1.IBeginTransactionRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.firestore.v1beta1.IBeginTransactionResponse, protosTypes.google.firestore.v1beta1.IBeginTransactionRequest | undefined, {} | undefined>): void;
    commit(request: protosTypes.google.firestore.v1beta1.ICommitRequest, options?: gax.CallOptions): Promise<[protosTypes.google.firestore.v1beta1.ICommitResponse, protosTypes.google.firestore.v1beta1.ICommitRequest | undefined, {} | undefined]>;
    commit(request: protosTypes.google.firestore.v1beta1.ICommitRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.firestore.v1beta1.ICommitResponse, protosTypes.google.firestore.v1beta1.ICommitRequest | undefined, {} | undefined>): void;
    rollback(request: protosTypes.google.firestore.v1beta1.IRollbackRequest, options?: gax.CallOptions): Promise<[protosTypes.google.protobuf.IEmpty, protosTypes.google.firestore.v1beta1.IRollbackRequest | undefined, {} | undefined]>;
    rollback(request: protosTypes.google.firestore.v1beta1.IRollbackRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.protobuf.IEmpty, protosTypes.google.firestore.v1beta1.IRollbackRequest | undefined, {} | undefined>): void;
    /**
     * Gets multiple documents.
     *
     * Documents returned by this method are not guaranteed to be returned in the
     * same order that they were requested.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.database
     *   Required. The database name. In the format:
     *   `projects/{project_id}/databases/{database_id}`.
     * @param {string[]} request.documents
     *   The names of the documents to retrieve. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   The request will fail if any of the document is not a child resource of the
     *   given `database`. Duplicate names will be elided.
     * @param {google.firestore.v1beta1.DocumentMask} request.mask
     *   The fields to return. If not set, returns all fields.
     *
     *   If a document has a field that is not present in this mask, that field will
     *   not be returned in the response.
     * @param {Buffer} request.transaction
     *   Reads documents in a transaction.
     * @param {google.firestore.v1beta1.TransactionOptions} request.newTransaction
     *   Starts a new transaction and reads the documents.
     *   Defaults to a read-only transaction.
     *   The new transaction ID will be returned as the first response in the
     *   stream.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 60 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits [BatchGetDocumentsResponse]{@link google.firestore.v1beta1.BatchGetDocumentsResponse} on 'data' event.
     */
    batchGetDocuments(request?: protosTypes.google.firestore.v1beta1.IBatchGetDocumentsRequest, options?: gax.CallOptions): gax.CancellableStream;
    /**
     * Runs a query.
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents` or
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {google.firestore.v1beta1.StructuredQuery} request.structuredQuery
     *   A structured query.
     * @param {Buffer} request.transaction
     *   Reads documents in a transaction.
     * @param {google.firestore.v1beta1.TransactionOptions} request.newTransaction
     *   Starts a new transaction and reads the documents.
     *   Defaults to a read-only transaction.
     *   The new transaction ID will be returned as the first response in the
     *   stream.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 60 seconds.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits [RunQueryResponse]{@link google.firestore.v1beta1.RunQueryResponse} on 'data' event.
     */
    runQuery(request?: protosTypes.google.firestore.v1beta1.IRunQueryRequest, options?: gax.CallOptions): gax.CancellableStream;
    /**
     * Streams batches of document updates and deletes, in order.
     *
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which is both readable and writable. It accepts objects
     *   representing [WriteRequest]{@link google.firestore.v1beta1.WriteRequest} for write() method, and
     *   will emit objects representing [WriteResponse]{@link google.firestore.v1beta1.WriteResponse} on 'data' event asynchronously.
     */
    write(options?: gax.CallOptions): gax.CancellableStream;
    /**
     * Listens to changes.
     *
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which is both readable and writable. It accepts objects
     *   representing [ListenRequest]{@link google.firestore.v1beta1.ListenRequest} for write() method, and
     *   will emit objects representing [ListenResponse]{@link google.firestore.v1beta1.ListenResponse} on 'data' event asynchronously.
     */
    listen(options?: gax.CallOptions): gax.CancellableStream;
    listDocuments(request: protosTypes.google.firestore.v1beta1.IListDocumentsRequest, options?: gax.CallOptions): Promise<[protosTypes.google.firestore.v1beta1.IDocument[], protosTypes.google.firestore.v1beta1.IListDocumentsRequest | null, protosTypes.google.firestore.v1beta1.IListDocumentsResponse]>;
    listDocuments(request: protosTypes.google.firestore.v1beta1.IListDocumentsRequest, options: gax.CallOptions, callback: Callback<protosTypes.google.firestore.v1beta1.IDocument[], protosTypes.google.firestore.v1beta1.IListDocumentsRequest | null, protosTypes.google.firestore.v1beta1.IListDocumentsResponse>): void;
    /**
     * Equivalent to {@link listDocuments}, but returns a NodeJS Stream object.
     *
     * This fetches the paged responses for {@link listDocuments} continuously
     * and invokes the callback registered for 'data' event for each element in the
     * responses.
     *
     * The returned object has 'end' method when no more elements are required.
     *
     * autoPaginate option will be ignored.
     *
     * @see {@link https://nodejs.org/api/stream.html}
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent resource name. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents` or
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents` or
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {string} request.collectionId
     *   Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`
     *   or `messages`.
     * @param {number} request.pageSize
     *   The maximum number of documents to return.
     * @param {string} request.pageToken
     *   The `next_page_token` value returned from a previous List request, if any.
     * @param {string} request.orderBy
     *   The order to sort results by. For example: `priority desc, name`.
     * @param {google.firestore.v1beta1.DocumentMask} request.mask
     *   The fields to return. If not set, returns all fields.
     *
     *   If a document has a field that is not present in this mask, that field
     *   will not be returned in the response.
     * @param {Buffer} request.transaction
     *   Reads documents in a transaction.
     * @param {google.protobuf.Timestamp} request.readTime
     *   Reads documents as they were at the given time.
     *   This may not be older than 60 seconds.
     * @param {boolean} request.showMissing
     *   If the list should show missing documents. A missing document is a
     *   document that does not exist but has sub-documents. These documents will
     *   be returned with a key but will not have fields, [Document.create_time][google.firestore.v1beta1.Document.create_time],
     *   or [Document.update_time][google.firestore.v1beta1.Document.update_time] set.
     *
     *   Requests with `show_missing` may not specify `where` or
     *   `order_by`.
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing [Document]{@link google.firestore.v1beta1.Document} on 'data' event.
     */
    listDocumentsStream(request?: protosTypes.google.firestore.v1beta1.IListDocumentsRequest, options?: gax.CallOptions | {}): Transform;
    listCollectionIds(request: protosTypes.google.firestore.v1beta1.IListCollectionIdsRequest, options?: gax.CallOptions): Promise<[string[], protosTypes.google.firestore.v1beta1.IListCollectionIdsRequest | null, protosTypes.google.firestore.v1beta1.IListCollectionIdsResponse]>;
    listCollectionIds(request: protosTypes.google.firestore.v1beta1.IListCollectionIdsRequest, options: gax.CallOptions, callback: Callback<string[], protosTypes.google.firestore.v1beta1.IListCollectionIdsRequest | null, protosTypes.google.firestore.v1beta1.IListCollectionIdsResponse>): void;
    /**
     * Equivalent to {@link listCollectionIds}, but returns a NodeJS Stream object.
     *
     * This fetches the paged responses for {@link listCollectionIds} continuously
     * and invokes the callback registered for 'data' event for each element in the
     * responses.
     *
     * The returned object has 'end' method when no more elements are required.
     *
     * autoPaginate option will be ignored.
     *
     * @see {@link https://nodejs.org/api/stream.html}
     *
     * @param {Object} request
     *   The request object that will be sent.
     * @param {string} request.parent
     *   Required. The parent document. In the format:
     *   `projects/{project_id}/databases/{database_id}/documents/{document_path}`.
     *   For example:
     *   `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`
     * @param {number} request.pageSize
     *   The maximum number of results to return.
     * @param {string} request.pageToken
     *   A page token. Must be a value from
     *   [ListCollectionIdsResponse][google.firestore.v1beta1.ListCollectionIdsResponse].
     * @param {object} [options]
     *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
     * @returns {Stream}
     *   An object stream which emits an object representing string on 'data' event.
     */
    listCollectionIdsStream(request?: protosTypes.google.firestore.v1beta1.IListCollectionIdsRequest, options?: gax.CallOptions | {}): Transform;
    /**
     * Terminate the GRPC channel and close the client.
     *
     * The client will no longer be usable and all future behavior is undefined.
     */
    close(): Promise<void>;
}
