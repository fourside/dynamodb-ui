export class TableName {
  private static namePattern = /^([a-zA-Z]+)-([a-z0-9]+)-([a-z]+)$/;

  static getEnv(fullName: string): string {
    const matches = this.namePattern.exec(fullName);
    if (!matches?.[3]) {
      throw new Error(
        `not match table name pattern, table name: [${fullName}]`
      );
    }
    return matches[3];
  }

  static displayName(fullName: string): string {
    const matches = this.namePattern.exec(fullName);
    if (!matches?.[1]) {
      throw new Error(
        `not match table name pattern, table name: [${fullName}]`
      );
    }
    return matches[1];
  }

  static getFindCallback(
    tableName: string,
    env: string
  ): (table: string) => boolean {
    const pattern = new RegExp(`^${tableName}-\\w+-${env}$`);
    return (table: string) => {
      return pattern.test(table);
    };
  }
}
