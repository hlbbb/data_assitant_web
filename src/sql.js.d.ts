declare module 'sql.js' {
  interface Database {
    run(sql: string): void
    exec(sql: string): Array<{ columns: string[]; values: unknown[][] }>
    close(): void
  }
  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number>) => Database
  }
  export default function initSqlJs(config?: {
    locateFile?: (filename: string) => string
  }): Promise<SqlJsStatic>
}
