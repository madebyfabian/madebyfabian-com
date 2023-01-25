/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n\t\tquery ListPosts {\n\t\t\tposts {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdateGmt\n\t\t\t\t\tslug\n\t\t\t\t\texcerpt(format: RAW)\n\t\t\t\t\tfeaturedImage {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tsourceUrl\n\t\t\t\t\t\t\taltText\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthor {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.ListPostsDocument,
    "\n\t\tquery SingleMenu($id: ID!) {\n\t\t\tmenu(id: $id, idType: ID) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tmenuItems {\n\t\t\t\t\tedges {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\torder\n\t\t\t\t\t\t\turi\n\t\t\t\t\t\t\ttarget\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.SingleMenuDocument,
    "\n\t\tquery AllSettings {\n\t\t\tallSettings {\n\t\t\t\tgeneralSettingsTitle\n\t\t\t\tgeneralSettingsDescription\n\t\t\t}\n\t\t}\n\t": types.AllSettingsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery ListPosts {\n\t\t\tposts {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdateGmt\n\t\t\t\t\tslug\n\t\t\t\t\texcerpt(format: RAW)\n\t\t\t\t\tfeaturedImage {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tsourceUrl\n\t\t\t\t\t\t\taltText\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthor {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery ListPosts {\n\t\t\tposts {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdateGmt\n\t\t\t\t\tslug\n\t\t\t\t\texcerpt(format: RAW)\n\t\t\t\t\tfeaturedImage {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tsourceUrl\n\t\t\t\t\t\t\taltText\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tedges {\n\t\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthor {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery SingleMenu($id: ID!) {\n\t\t\tmenu(id: $id, idType: ID) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tmenuItems {\n\t\t\t\t\tedges {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\torder\n\t\t\t\t\t\t\turi\n\t\t\t\t\t\t\ttarget\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery SingleMenu($id: ID!) {\n\t\t\tmenu(id: $id, idType: ID) {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tmenuItems {\n\t\t\t\t\tedges {\n\t\t\t\t\t\tnode {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tlabel\n\t\t\t\t\t\t\torder\n\t\t\t\t\t\t\turi\n\t\t\t\t\t\t\ttarget\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery AllSettings {\n\t\t\tallSettings {\n\t\t\t\tgeneralSettingsTitle\n\t\t\t\tgeneralSettingsDescription\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery AllSettings {\n\t\t\tallSettings {\n\t\t\t\tgeneralSettingsTitle\n\t\t\t\tgeneralSettingsDescription\n\t\t\t}\n\t\t}\n\t"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;