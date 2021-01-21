import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

export declare class Chat {
  readonly id: string;
  readonly user: string;
  readonly message: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Chat>);
  static copyOf(source: Chat, mutator: (draft: MutableModel<Chat>) => MutableModel<Chat> | void): Chat;
}