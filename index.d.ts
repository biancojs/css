export declare function get<T extends Element>(el: T, attr: string): string | null
export declare function get<T extends Element>(el: T, attrs: string[]): Record<string, unknown>[] | null
export declare function get<T extends Element>(els: T[], attr: string): string[] | null
export declare function get<T extends Element>(els: T[], attrs: string[]): Record<string, unknown>[][] | null

export declare function set<T extends Element>(el: T, attr: string, val: unknown): T
export declare function set<T extends Element>(el: T, attrs: Record<string, unknown>): T
export declare function set<T extends Element>(els: T[], attr: string, val: unknown): T[]
export declare function set<T extends Element>(els: T[], attrs: Record<string, unknown>): T[]

export declare function remove<T extends Element>(el: T, attr: string | string[]): T
export declare function remove<T extends Element>(els: T[], attr: string | string[]): T[]

export default {
  get,
  set,
  remove
}



